const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config();
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const { getRandomValues } = require('crypto');
const { PAYMONGO_SECRET_KEY } = process.env;
const scriptPath = path.join(__dirname, 'python', 'recommendation.py');


const secretKey = 'your-secret-key'; // Use a strong secret key
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to ensure unique filenames
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});


// PostgreSQL connection setup
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }, // Use true if the certificate is trusted
});


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Route to log in and get a JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
      const result = await pool.query('SELECT customer_id, firstname, lastname, password, username FROM customertbl WHERE username = $1', [username]);
      const user = result.rows[0];

      if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password); // Compare the password
          
          if (passwordMatch) {
              // Generate a token (e.g., JWT)
              const token = jwt.sign(
                { username: user.username,
                  firstname: user.firstname,  // include firstname in the token payload
                  lastname: user.lastname }, 
                secretKey, 
                { expiresIn: '1h' } // Set token expiration time
              );

              res.json({ 
                  success: true, 
                  message: 'Login successful', 
                  token, 
                  customer_id: user.customer_id, 
                  firstname: user.firstname,
                  lastname: user.lastname,
                  username: user.username
              });
          } else {
              res.status(401).json({ success: false, message: 'Invalid username or password' });
          }
      } else {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ success: false, message: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    // Assuming user contains firstname and lastname
    req.user = {
      customer_id:user.customer_id,
      username: user.username,  // assuming username is part of the token payload
      firstname: user.firstname,  // include firstname
      lastname: user.lastname    // include lastname
    };

    next();
  });
};

const authenticateadminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ success: false, message: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    // Assuming user contains firstname, lastname, and position
    req.user = {
      username: user.username,  // Assuming username is part of the token payload
      firstname: user.firstname, // Include firstname
      lastname: user.lastname,   // Include lastname
      position: user.position    // Include position
    };

    next();
  });
};

// Authentication middleware for employee
const authenticateEmployeeToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ success: false, message: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    // Assuming user contains firstname, lastname, and position
    req.user = {
      id: user.id,  // Assuming username is part of the token payload
      username: user.username,  // Assuming username is part of the token payload
      firstname: user.firstname, // Include firstname
      lastname: user.lastname,   // Include lastname
      position: user.position,
      branch: user.branch_id    // Include position
    };

    next();
  });
};

app.get('/employee-profile', authenticateEmployeeToken, (req, res) => {
  res.json({ success: true, user: req.user });
});



app.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Log to verify request data
    console.log("Login attempt by:", username);

    // Fetch the user from the database
    const result = await pool.query('SELECT * FROM employeetbl WHERE username = $1', [username]);

    // Check if user exists
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const user = result.rows[0];

    // Check if the password matches and if the user is an admin
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.position !== 'Admin') {
      return res.status(401).json({ success: false, message: 'Invalid username or password or not an admin' });
    }

    // Generate JWT token with position included
    const token = jwt.sign(
      { 
        id: user.employee_id, 
        username: user.username, 
        firstname: user.firstname, 
        lastname: user.lastname,
        position: user.position, // Include position in the token payload
        branch: user.branch_id,
      },
      secretKey, // Use the hardcoded secret key
      { expiresIn: '1h' }
    );

    return res.json({ 
      success: true, 
      message: 'Login successful', 
      token, 
      employee_id: user.employee_id, 
      username: user.username,
      position: user.position 
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error during admin login:", error);

    // Return a 500 Internal Server Error with error details
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

app.post('/branch-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Log to verify request data
    console.log("Branch login attempt by:", username);

    // Fetch the employee from the employeestbl
    const result = await pool.query('SELECT * FROM employeetbl WHERE username = $1', [username]);

    // Check if employee exists
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const employee = result.rows[0];

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Generate JWT token with employee information included
    const token = jwt.sign(
      { 
        id: employee.employee_id, 
        username: employee.username, 
        firstname: employee.firstname, 
        lastname: employee.lastname,
        position: employee.position,
        branch_id: employee.branch_id // Include employee position in the token payload
      },
      secretKey, // Use your JWT secret key here
      { expiresIn: '1h' }
    );

    // Return success response with token and employee info
    return res.json({ 
      success: true, 
      message: 'Login successful', 
      token, 
      employee_id: employee.employee_id, 
      username: employee.username,
      position: employee.position,
      branch_id: employee.branch_id
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error during branch login:", error);

    // Return a 500 Internal Server Error with error details
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});



app.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password, address, phone } = req.body;
  
    if (!firstName || !lastName || !email || !username || !password || !address || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
  
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Insert the user and get the new customer_id
      const result = await pool.query(
        `INSERT INTO customertbl (firstname, lastname, email, username, password, address, phonenumber)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING customer_id`,
        [firstName, lastName, email, username, hashedPassword, address, phone]
      );
  
      const customer_id = result.rows[0];
  
      res.status(200).json({ success: true, message: 'Registration successful', customer_id });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, message: 'Server error', details: error.message });
    }
  });

app.get('/admin-profile', authenticateadminToken, (req, res) => {
    res.json({ success: true, user: req.user });
  })

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.post('/profile/update', async (req, res) => {
  const { customer_id, firstname, username } = req.body;

  try {
      const result = await pool.query(
          'UPDATE customertbl SET firstname = $1, username = $2 WHERE customer_id = $3 RETURNING *',
          [firstname, username, customer_id]
      );
      
      const updatedUser = result.rows[0];
      res.json({ success: true, user: updatedUser });
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customertbl ORDER BY customer_id');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single customer by ID
app.get('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM customertbl WHERE customer_id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new customer
app.post('/api/customers', async (req, res) => {
  const { firstname, lastname, email, address, username, password, phone } = req.body;

  try {
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const result = await pool.query(
      'INSERT INTO customertbl (firstname, lastname, email, address, username, password, phonenumber) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [firstname, lastname, email, address, username, hashedPassword, phone] // Use hashed password here
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a customer
app.put('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, address, username, password, phone } = req.body;

  try {
    // Fetch existing customer data to compare passwords
    const customerQuery = await pool.query('SELECT password FROM customertbl WHERE customer_id = $1', [id]);

    if (customerQuery.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    let updatedPassword = customerQuery.rows[0].password; // Default to existing password

    // If a new password is provided, hash it
    if (password && password !== updatedPassword) {
      updatedPassword = await bcrypt.hash(password, 10); // Re-hash the new password
    }

    // Update the customer record with the new or existing password
    const result = await pool.query(
      'UPDATE customertbl SET firstname = $1, lastname = $2, email = $3, address = $4, username = $5, password = $6, phonenumber = $7 WHERE customer_id = $8 RETURNING *',
      [firstname, lastname, email, address, username, updatedPassword, phone, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete a customer
app.delete('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM customertbl WHERE customer_id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employeetbl ORDER BY employee_id');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/employees', async (req, res) => {
  const { firstname, lastname, email, address, username, password, phonenumber, position } = req.body;

  // Validate input
  if (!firstname || !lastname || !email || !username || !phonenumber) {
    return res.status(400).json({ error: 'All fields except Password are required.' });
  }

  try {
    // Hash the password
    const saltRounds = 10; // You can adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO employeetbl (firstname, lastname, email, address, username, password, phone_number, position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [firstname, lastname, email, address, username, hashedPassword, phonenumber, position] // Use hashedPassword instead of password
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/employees/:employeeid', async (req, res) => {
  const { employeeid } = req.params;
  const { firstname, lastname, email, position, username, password, phonenumber } = req.body;
  try {
    const result = await pool.query(
      'UPDATE employeetbl SET firstname = $1, lastname = $2, email = $3, position = $4, username = $5, password = $6, phone_number = $7 WHERE employee_id = $8 RETURNING *',
      [firstname, lastname, email, position, username, password, phonenumber, employeeid]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM employeetbl WHERE employee_id = $1', [id]);
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/products', upload.single('image'), async (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Log the image info
    console.log('Image file details:', req.file);

    // Get the category ID from the database
    const categoryResult = await pool.query('SELECT * FROM categories WHERE name = $1', [category]);
    const categoryId = categoryResult.rows[0]?.id;

    if (!categoryId) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Insert the product into the database
    const query = 'INSERT INTO menutbl (itemname, price, category, category_id, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, price, category, categoryId, req.file.path];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to get products
app.get('/api/list-products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menutbl ORDER BY menu_id');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/list-products-branch/available/', authenticateEmployeeToken, async (req, res) => {
  try {
    // Extract the branch_id from the decoded token in the request object
    const branch_id = req.user.branch

    if (!branch_id) {
      return res.status(400).json({ error: 'Branch ID not found' });
    }

    // Query the database using branch_id
    const result = await pool.query(`
      SELECT a.availablemenu_id, m.menu_id, m.itemname, m.price, m.imageurl, m.category_id, a.available
      FROM availablemenutbl a
      JOIN menutbl m ON a.menu_id = m.menu_id
      WHERE a.branch_id = $1 AND a.available = true
      ORDER BY m.menu_id
    `, [branch_id]); // Use branch_id as a parameter in the query

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/list-products-branch/unavailable/', authenticateEmployeeToken, async (req, res) => {
  try {
    // Extract the branch_id from the decoded token in the request object
    const branch_id = req.user.branch

    if (!branch_id) {
      return res.status(400).json({ error: 'Branch ID not found' });
    }

    // Query the database using branch_id
    const result = await pool.query(`
      SELECT a.availablemenu_id, m.menu_id, m.itemname, m.price, m.imageurl, m.category_id, a.available
      FROM availablemenutbl a
      JOIN menutbl m ON a.menu_id = m.menu_id
      WHERE a.branch_id = $1 AND a.available = false
      ORDER BY m.menu_id
    `, [branch_id]); // Use branch_id as a parameter in the query

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/products/:id/available', async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const result = await pool.query(
      'UPDATE availablemenutbl SET available = TRUE WHERE availablemenu_id = $1 RETURNING *',
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product is now available', product: result.rows[0] });
  } catch (error) {
    console.error('Error updating product availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to mark a product as unavailable
app.put('/api/products/:id/unavailable', async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const result = await pool.query(
      'UPDATE availablemenutbl SET available = FALSE WHERE availablemenu_id = $1 RETURNING *',
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product is now unavailable', product: result.rows[0] });
  } catch (error) {
    console.error('Error updating product availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update product route
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const imagePath = req.file ? req.file.path : req.body.existingImage;  // Use existing image if no new image is provided

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const query = `
      UPDATE menutbl
      SET itemname = $1, price = $2, imageurl = $3
      WHERE menu_id = $4
      RETURNING *;
    `;
    const values = [name, price, imagePath, id];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to delete product with ID: ${id}`); // Log the product ID

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [parseInt(id, 10)]);

    if (result.rowCount > 0) {
      console.log('Product deleted successfully:', result.rows[0]); // Log the deleted product
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } else {
      console.log('Product not found'); // Log if the product was not found
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error.message); // Log the error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// API route to get categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorytbl ORDER BY category_id');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add-categories', upload.single('image'), async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    // Handle image if provided
    const imagePath = req.file ? req.file.path : null;

    // Insert the category into the database
    const query = 'INSERT INTO categories (name, image_path) VALUES ($1, $2) RETURNING *';
    const values = [name, imagePath];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/branches-app', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM branchtbl
      WHERE branch_id != 'BR00000'
      ORDER BY branch_id ASC
    `);

    // Send the result back as JSON
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/branches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM branchtbl');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/api/branchname', authenticateEmployeeToken, async (req, res) => {
  const branchId = req.user.branch; // Get branch_id from the authenticated user

  try {
    const result = await pool.query('SELECT * FROM branchtbl WHERE branch_id = $1', [branchId]);
    if (result.rows.length > 0) {
      res.json(result.rows); // Send back the branch name(s) and location
    } else {
      res.status(404).send('No branch found');
    }
  } catch (error) {
    console.error('Error fetching branch data:', error);
    res.status(500).send('Server error');
  }
});


app.put('/api/branches/:id', async (req, res) => {
  const branchId = req.params.id;
  const { image, name, address, icon } = req.body;

  if (!image || !name || !address || !icon) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'UPDATE branchtbl SET image = $1, name = $2, address = $3, icon = $4 WHERE id = $5 RETURNING *',
      [image, name, address, icon, branchId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating branch:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/add-branches', upload.fields([{ name: 'image' }, { name: 'icon' }]), async (req, res) => {
  try {
    const { name, address } = req.body;
    const imagePath = req.files['image'][0].path; // Get the uploaded image path
    const iconPath = req.files['icon'][0].path; // Get the uploaded icon path

    // Insert the branch into the PostgreSQL database
    const result = await pool.query(
      'INSERT INTO branchtbl (name, address, +, icon) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, address, imagePath, iconPath]
    );

    res.status(201).json({ message: 'Branch added successfully', branch: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding branch' });
  }
});

app.delete('/api/branches/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM branchtbl WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.status(204).send(); // No content
  } catch (error) {

    console.error('Error deleting branch:', error);
    res.status(500).json({ message: 'Error deleting branch', error: error.message });
  }
});

app.post('/api/orderitems', async (req, res) => {
  const { productId, orderId, quantity, note } = req.body;
  const orderitem_id = generateOrderNumber();

  try {
    // Check if the orderId already exists in ordertbl
    const existingOrder = await pool.query(
      'SELECT * FROM ordertbl WHERE order_id = $1',
      [orderId]
    );

    let order;
    
    // If the orderId doesn't exist, insert it
    if (existingOrder.rows.length === 0) {
      order = await pool.query(
        'INSERT INTO ordertbl (order_id) VALUES ($1) RETURNING *',
        [orderId]
      );
    } else {
      order = existingOrder;
    }

    // Insert into orderitemtbl (regardless of whether orderId was new or existing)
    const productPriceQuery = await pool.query('SELECT price FROM menutbl WHERE menu_id = $1', [productId]);
    const productPrice = productPriceQuery.rows[0]?.price;

    if (productPrice === undefined) {
      throw new Error('Product price not found');
    }

    const priceTotal = productPrice * quantity;

    const result = await pool.query(
      'INSERT INTO orderitemtbl (orderitem_id, order_id, menu_id, quantity, price_total, total_amount, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [orderitem_id, orderId, productId, quantity, productPrice, priceTotal, note]
    );

    // Respond with both the order and order item information
    res.status(201).json({
      order: order.rows[0], // Whether new or existing, return the order details
      result: result.rows[0], // Newly inserted order item
    });
  } catch (error) {
    console.error('Error adding order item:', error);
    res.status(500).json({ error: 'Failed to add order item' });
  }
});


app.get('/api/order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await pool.query(
      `SELECT oi.*, m.itemname, m.price 
       FROM orderitemtbl oi 
       JOIN menutbl m ON oi.menu_id = m.menu_id 
       WHERE oi.order_id = $1`,
      [orderId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching order items:', error.message, error.stack); // Add more details to the error logging
    res.status(500).json({ error: 'Failed to fetch order items' });
  }
});

app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menutbl');
    res.json(result.rows); // Send rows as JSON response
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Increase item quantity
app.post('/api/order/increase/:orderitem_id', async (req, res) => {
  const { orderitem_id } = req.params;
  try {
    const itemQuery = await pool.query('SELECT price FROM menutbl WHERE menu_id = (SELECT menu_id FROM orderitemtbl WHERE orderitem_id = $1)', [orderitem_id]);

    if (itemQuery.rowCount === 0) {
      return res.status(404).send('Item not found');
    }

    const pricePerItem = Number(itemQuery.rows[0].price);
    if (isNaN(pricePerItem)) {
      throw new Error('pricePerItem is not a valid number');
    }
    const priceItem = parseFloat(pricePerItem.toFixed(2));
    // Logic to increase quantity in the database
    await pool.query('UPDATE orderitemtbl SET quantity = quantity + 1 WHERE orderitem_id = $1', [orderitem_id]);
    await pool.query('UPDATE orderitemtbl SET total_amount = quantity * $1 WHERE orderitem_id = $2', [priceItem, orderitem_id]);
    res.status(200).send('Quantity increased');
  } catch (error) {
    console.error('Error increasing quantity:', error);
    res.status(500).send('Error increasing quantity');
  }
});

app.get('/api/order-items/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Query the orderitemtbl for the specific order_id
    const query = `
      SELECT o.menu_id, o.quantity, m.itemname, m.price
FROM orderitemtbl o
JOIN menutbl m ON o.menu_id = m.menu_id
WHERE o.order_id = $1;

    `;
    const result = await pool.query(query, [orderId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No items found for this order ID' });
    }

    res.json(result.rows); // Send the retrieved items as a response
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/stock-items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stockitemstbl');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving stock items', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/add-stock', async (req, res) => {
  const { item_id, quantity, expirationdate } = req.body;

  // Validate incoming data
  if (!item_id || !quantity || !expirationdate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Insert stock data into inventorytbl
    const query = 'INSERT INTO inventorytbl (branch_id, quantity, expirationdate, item_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = ["0", quantity, expirationdate, item_id];
    const result = await pool.query(query, values);

    // Send response with the inserted stock data
    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error adding stock to inventory:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Decrease item quantity
app.post('/api/order/decrease/:orderitem_id', async (req, res) => {
  const { orderitem_id } = req.params;
  try {
    const itemQuery = await pool.query('SELECT price FROM menutbl WHERE menu_id = (SELECT menu_id FROM orderitemtbl WHERE orderitem_id = $1)', [orderitem_id]);

    if (itemQuery.rowCount === 0) {
      return res.status(404).send('Item not found');
    }

    const pricePerItem = Number(itemQuery.rows[0].price);
    if (isNaN(pricePerItem)) {
      throw new Error('pricePerItem is not a valid number');
    }
    const priceItem = parseFloat(pricePerItem.toFixed(2));
    // Logic to decrease quantity (ensure it doesn't go below 1)
    await pool.query('UPDATE orderitemtbl SET quantity = GREATEST(quantity - 1, 1) WHERE orderitem_id = $1', [orderitem_id]);
    await pool.query('UPDATE orderitemtbl SET total_amount = quantity * $1 WHERE orderitem_id = $2', [priceItem, orderitem_id]);
    res.status(200).send('Quantity decreased');
  } catch (error) {
    console.error('Error decreasing quantity:', error);
    res.status(500).send('Error decreasing quantity');
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventorytbl');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/approve-request', async (req, res) => {
  const { item_id, requested_quantity: reqQuantity } = req.body;
  let requested_quantity = reqQuantity;

  try {
    const itemsToFulfill = [];

    // Query to get all items of the requested item_id
    const result = await pool.query(
      `
          SELECT i.*, si.itemname 
          FROM inventorytbl i 
          JOIN stockitemstbl si ON i.item_id = si.item_id 
          WHERE i.item_id = $1 AND i.branch_id = 0 
          ORDER BY i.expirationdate ASC
          `,
      [item_id]
    );

    // Check if there are any items returned
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No items found for the requested item_id.' });
    }

    // Iterate over the retrieved items
    for (let row of result.rows) {
      let availableQuantity = row.quantity;

      // Use a while loop to decrement requested_quantity
      while (requested_quantity > 0 && availableQuantity > 0) {
        const quantityToTake = Math.min(requested_quantity, availableQuantity);

        // Add a copy of the item to the fulfillment array, including inventory_id
        itemsToFulfill.push({
          inventory_id: row.inventory_id, // Added inventory_id
          item_id: row.item_id,
          itemname: row.itemname,
          expirationdate: row.expirationdate,
          quantity: quantityToTake
        });

        requested_quantity -= quantityToTake;
        availableQuantity -= quantityToTake;

        if (requested_quantity <= 0) {
          break;
        }
      }

      if (requested_quantity <= 0) {
        break;
      }
    }

    if (itemsToFulfill.length > 0) {
      res.status(200).json(itemsToFulfill);
    } else {
      res.status(404).json({ message: 'Not enough items available to fulfill the request.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to confirm approval, insert data into sentitemstbl, update stockrequeststbl, and update inventory
app.post('/api/confirm-approval', async (req, res) => {
  const { request_id, itemDetails, branch_id } = req.body;

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Insert each item into the sentitemstbl and update inventory
    for (const item of itemDetails) {
      const { inventory_id, item_id, quantity, expirationdate } = item;

      // 1. Insert the approved items into sentitemstbl
      await pool.query(
        'INSERT INTO sentitemstbl (request_id, item_id, quantity, expirationdate, branch_id) VALUES ($1, $2, $3, $4, $5)',
        [request_id, item_id, quantity, expirationdate, branch_id]
      );

      // 2. Update the inventorytbl by decreasing the quantity based on inventory_id
      await pool.query(
        'UPDATE inventorytbl SET quantity = quantity - $1 WHERE inventory_id = $2',
        [quantity, inventory_id]
      );
    }

    // 3. Update the stockrequeststbl to set the status to 'Approved'
    await pool.query(
      'UPDATE stockrequeststbl SET status = $1 WHERE request_id = $2',
      ['Approved', request_id]
    );

    // Commit the transaction if all queries succeed
    await pool.query('COMMIT');
    res.status(200).json({ message: 'Items confirmed, inventory updated, and request status set to approved.' });
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    console.error('Error during confirmation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Add a new inventory item
app.post('/api/inventory', async (req, res) => {
  const { branch_id, itemname, quantity, expirationdate } = req.body;

  try {
    const newItem = await pool.query(
      'INSERT INTO inventorytbl (branch_id, itemname, quantity, expirationdate) VALUES ($1, $2, $3, $4) RETURNING *',
      [branch_id, itemname, quantity, expirationdate]
    );

    res.status(201).json(newItem.rows[0]);
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/stock-requests/pending', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT sr.request_id, sr.branch_id, b.branchname, sr.request_date, sr.status, sr.completion_date, sr.item_id, si.itemname, sr.quantity FROM stockrequeststbl sr JOIN branchtbl b ON sr.branch_id = b.branch_id JOIN stockitemstbl si ON sr.item_id = si.item_id WHERE sr.status = $1',
      ['Pending']
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/stock-requests/Approved', async (req, res) => {
  try {
    const result = await pool.query('SELECT request_id, branch_id, request_date, status, completion_date FROM stockrequeststbl WHERE status = $1', ['Approved']);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/stock-requests/Completed', async (req, res) => {
  try {
    const result = await pool.query('SELECT request_id, branch_id, request_date, status, completion_date FROM stockrequeststbl WHERE status = $1', ['Completed']);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/approve-request', async (req, res) => {
  const { requestId, itemId, quantity, branchId } = req.body; // Include branchId

  try {
    // Check if the item is available
    const itemResult = await pool.query(
      'SELECT * FROM inventorytbl WHERE item_id = $1 AND branch_id = 0',
      [itemId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const item = itemResult.rows[0];

    // Check if enough quantity is available
    if (item.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity available' });
    }

    // Approve the request
    await pool.query(
      'UPDATE stock_requests SET status = $1 WHERE request_id = $2',
      ['approved', requestId]
    );

    // Insert into sentitemstbl
    await pool.query(
      'INSERT INTO sentitemstbl (request_id, item_id, branch_id, quantity) VALUES ($1, $2, $3, $4)',
      [requestId, itemId, branchId, quantity]
    );

    // Reduce the quantity in inventory
    await pool.query(
      'UPDATE inventorytbl SET quantity = quantity - $1 WHERE item_id = $2 AND branch_id = 0',
      [quantity, itemId]
    );

    res.json({ message: 'Request approved successfully' });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/stocks', authenticateEmployeeToken, async (req, res) => {
  const { branch } = req.user;

  try {
    // Query the database for stock items of the specific branch
    const result = await pool.query(
      `SELECT i.inventory_id, i.quantity, i.expirationdate, s.itemname FROM inventorytbl i JOIN stockitemstbl s ON i.item_id = s.item_id WHERE i.branch_id = $1;`,
      [branch]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stock items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/expiring-items', authenticateEmployeeToken, async (req, res) => {
  const { branch } = req.user;

  try {
    // Query the database for stock items of the specific branch
    const result = await pool.query(
      `SELECT i.inventory_id, s.itemname, i.expirationdate FROM inventorytbl i JOIN stockitemstbl s ON i.item_id = s.item_id WHERE i.branch_id = $1 AND i.expirationdate <= NOW() + INTERVAL '30 days' ORDER BY i.expirationdate ASC`,[branch]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stock items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/alert-stock', authenticateEmployeeToken, async (req, res) => {
  const { branch } = req.user;

  try {
    // Query the database for stock items of the specific branch
    const result = await pool.query(
      `SELECT s.itemname, SUM(i.quantity) AS total_quantity, i.item_id, i.branch_id FROM inventorytbl i JOIN stockitemstbl s ON i.item_id = s.item_id WHERE i.branch_id = $1 GROUP BY s.itemname, i.item_id, i.branch_id HAVING SUM(i.quantity) < 20 ORDER BY s.itemname ASC`, [branch],
    res.json(result.rows));
  } catch (error) {
    console.error('Error fetching stock items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/requests', authenticateEmployeeToken, async (req, res) => {
  const { branch } = req.user;

  try {
    // Query the database for stock items of the specific branch
    const result = await pool.query(
      `SELECT sr.request_id, sr.item_id, s.itemname, sr.quantity, sr.status FROM stockrequeststbl sr JOIN stockitemstbl s ON sr.item_id = s.item_id WHERE sr.branch_id = $1 AND sr.status IN ('Pending', 'Approved')`,
      [branch]
      `SELECT s.itemname, SUM(i.quantity) AS total_quantity FROM inventorytbl i JOIN stockitemstbl s ON i.item_id = s.item_id WHERE i.branch_id = $1 GROUP BY s.itemname HAVING SUM(i.quantity) < 20 ORDER BY s.itemname ASC`,[branch]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stock items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/send-request', async (req, res) => {
  const { branch_id, item_id, quantity } = req.body;

  // Validate that all required fields are present
  if (!branch_id || !item_id || !quantity) {
    return res.status(400).json({ message: 'Branch ID, item ID, and quantity are required.' });
  }

  try {
    // Insert into stockrequeststbl
    const insertQuery = `
      INSERT INTO stockrequeststbl (branch_id, item_id, quantity, status, request_date)
      VALUES ($1, $2, $3, 'Pending', NOW())
      RETURNING request_id
    `;

    const result = await pool.query(insertQuery, [branch_id, item_id, quantity]);

    // Return the newly created request ID
    const newRequestId = result.rows[0].request_id;
    return res.status(201).json({ message: 'Stock request submitted successfully', request_id: newRequestId });

  } catch (error) {
    console.error('Error inserting stock request:', error);
    return res.status(500).json({ message: 'Failed to submit stock request' });
  }
});

app.post('/api/receive-items', async (req, res) => {
  const { request_id } = req.body;

  try {
    // Fetch the items from sentitemstbl where request_id matches
    const selectQuery = `
      SELECT item_id, quantity, expirationdate, branch_id
      FROM sentitemstbl
      WHERE request_id = $1
    `;
    const { rows: sentItems } = await pool.query(selectQuery, [request_id]);

    if (sentItems.length === 0) {
      return res.status(404).json({ message: 'No items found for this request' });
    }

    // Insert each item into the inventory table
    const insertQuery = `
      INSERT INTO inventorytbl (item_id, quantity, expirationdate, branch_id)
      VALUES ($1, $2, $3, $4)
    `;
    for (const item of sentItems) {
      await pool.query(insertQuery, [
        item.item_id,
        item.quantity,
        item.expirationdate,
        item.branch_id,
      ]);
    }

    // Update the status in sentitemstbl to 'Received'
    const updateQuery = `
      UPDATE stockrequeststbl
      SET status = 'Completed', completion_date = NOW()
      WHERE request_id = $1
    `;
    await pool.query(updateQuery, [request_id]);

    res.status(200).json({ message: 'Items transferred to inventory and status updated to Received' });
  } catch (error) {
    console.error('Error processing stock transfer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/admin-stocks', authenticateEmployeeToken, async (req, res) => {
  const { branch } = req.user;

  try {
    // Query the database for stock items of the specific branch
    const result = await pool.query(
      `SELECT i.inventory_id, i.quantity, i.expirationdate, s.itemname FROM inventorytbl i JOIN stockitemstbl s ON i.item_id = s.item_id WHERE i.branch_id = $1`, [branch]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stock items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/send-stock', async (req, res) => {
  const { branchName, quantity, itemId, expirationdate } = req.body;

  try {
    // Insert into inventorytbl
    await pool.query(
      'INSERT INTO inventorytbl (branch_id, item_id, quantity, expirationdate) VALUES ($1, $2, $3, $4)',
      [branchName, itemId, quantity, expirationdate]
    );

    // Update the current stock in the inventory
    await pool.query(
      'UPDATE inventorytbl SET quantity = quantity - $1 WHERE inventory_id = $2',
      [quantity, itemId]
    );

    res.status(200).json({ message: 'Stock transferred successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to transfer stock.' });
  }
});

app.post('/api/submit-payment', async (req, res) => {
  const { orderId, branchId, totalAmount, paymentMethod, invoiceDate, type, employeeId, referenceNumber } = req.body;
  const invoiceId = orderId.replace("ORD", "INV");

  try {
    if (referenceNumber === 'N/A') {
      const updateOrderQuery = 'UPDATE ordertbl SET status = $1, branch_id = $2, type = $3, employee_id = $4 WHERE order_id = $5';
      await pool.query(updateOrderQuery, ['Preparing', branchId, type, employeeId, orderId]);

      const insertInvoiceQuery = `
        INSERT INTO invoicetbl (invoice_id, order_id, invoicedate, totalamount, paymentmethod)
        VALUES ($1, $2, $3, $4, $5)`;

      await pool.query(insertInvoiceQuery, [invoiceId, orderId, invoiceDate, totalAmount, paymentMethod]);

      res.status(200).json({ success: true, message: 'Payment submitted successfully!' });
    } else {
      const updateOrderQuery = 'UPDATE ordertbl SET status = $1, branch_id = $2, type = $3, employee_id = $4 WHERE order_id = $5';
      await pool.query(updateOrderQuery, ['Preparing', branchId, type, employeeId, orderId]);

      const insertInvoiceQuery = `
        INSERT INTO invoicetbl (invoice_id, order_id, invoicedate, totalamount, paymentmethod, referencenumber)
        VALUES ($1, $2, $3, $4, $5, $6)`;

      await pool.query(insertInvoiceQuery, [invoiceId, orderId, invoiceDate, totalAmount, paymentMethod, referenceNumber]);

      res.status(200).json({ success: true, message: 'Payment submitted successfully!' });
    }
  } catch (error) {
    console.error('Error submitting payment:', error); // This should give more details
    res.status(500).json({ success: false, message: 'Error submitting payment' });
  }
});

app.get('/api/preparing-orders', authenticateEmployeeToken, async (req, res) => {
  try {
    const { branch } = req.user; // Extract branchId from the decoded token (req.user)
    
    // Query to fetch orders based on branchId
    const result = await pool.query('SELECT * FROM ordertbl WHERE branch_id = $1 AND status = $2', [branch, 'Preparing']);

    res.json(result.rows); // Send orders as response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/ready-orders', authenticateEmployeeToken, async (req, res) => {
  try {
    const { branch } = req.user; // Extract branchId from the decoded token (req.user)
    
    // Query to fetch orders based on branchId
    const result = await pool.query('SELECT * FROM ordertbl WHERE branch_id = $1 AND status = $2', [branch, 'Ready']);

    res.json(result.rows); // Send orders as response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/orders/:order_id/items', async (req, res) => {
  const { order_id } = req.params;
  try {
    console.log('Fetching items for order_id:', order_id); // Log the order_id for debugging

    // SQL query to fetch items for a specific order
    const result = await pool.query(`
      SELECT 
        oi.orderitem_id,
        oi.order_id,
        oi.quantity,
        m.itemname,
        m.price,
        m.description,
        m.imageurl
      FROM 
        orderitemtbl oi
      JOIN 
        menutbl m
      ON 
        oi.menu_id = m.menu_id
      WHERE 
        oi.order_id = $1;
    `, [order_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `No items found for order ID: ${order_id}` });
    }

    // Send back the order items with menu details
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching items for order', order_id, ':', err.message);
    res.status(500).json({ message: 'Server error fetching order items' });
  }
});

// Accept order and update status to "Ready"
app.put('/api/orders/:orderId/ready', authenticateToken, async (req, res) => {
  const { orderId } = req.params;
  try {
    await pool.query('UPDATE ordertbl SET status = $1 WHERE order_id = $2', ['Ready', orderId]);
    res.status(200).send({ message: 'Order status updated to Ready' });
  } catch (err) {
    console.error('Error in updating order status:', err);  // Log the error
    res.status(500).send({ error: 'Failed to update order status', details: err.message });
  }
});


app.put('/api/orders/:orderId/complete', authenticateToken, async (req, res) => {
  const { orderId } = req.params;
  try {
    await pool.query('UPDATE ordertbl SET status = $1 WHERE order_id = $2', ['Completed', orderId]);
    res.status(200).send({ message: 'Order status updated to Ready' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to update order status' });
  }
});

// Reject order and update status to "Cancelled"
app.put('/api/orders/:orderId/reject', authenticateToken, async (req, res) => {
  const { orderId } = req.params;
  try {
    await pool.query('UPDATE ordertbl SET status = $1 WHERE order_id = $2', ['Cancelled', orderId]);
    res.status(200).send({ message: 'Order status updated to Cancelled' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to update order status' });
  }
});
 // Make sure the secret key is in your environment variables

// Function to generate random ID (assuming this function exists)
const generateRandomId = (length) => {
  return Math.random().toString(36).substr(2, length);
};

app.post('/api/create-gcash-checkout-session', async (req, res) => {
  const { customer_id, lineItems } = req.body;

  const formattedLineItems = lineItems.map((product) => {
    return {
      currency: 'PHP',
      amount: Math.round(product.unit_price * 100), // Convert to cents
      name: product.item_description,
      quantity: product.quantity,
    };
  });

  const randomId = generateRandomId(28);

  try {
    const response = await axios.post(
      'https://api.paymongo.com/v1/checkout_sessions',
      {
        data: {
          attributes: {
            send_email_receipt: false,
            show_line_items: true,
            line_items: formattedLineItems,
            payment_method_types: ['gcash'],
            success_url: `https://website.sigbuilders.app/success?session_id=${randomId}`,
            cancel_url: 'https://website.sigbuilders.app/cancel',
          },
        },
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`, // Corrected Authorization header
        },
      }
    );

    const checkoutUrl = response.data.data.attributes.checkout_url;

    if (!checkoutUrl) {
      return res.status(500).json({ error: 'Checkout URL not found in response' });
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // UPSERT query to insert or update payment
      const query = `
        INSERT INTO payment (customer_id, session_id, payment_status)
        VALUES ($1, $2, $3)
        ON CONFLICT (customer_id)
        DO UPDATE SET 
          session_id = EXCLUDED.session_id,
          payment_status = EXCLUDED.payment_status;
      `;
      const values = [customer_id, randomId, 'pending'];

      await client.query(query, values);
      await client.query('COMMIT'); // Commit the transaction
    } catch (error) {
      await client.query('ROLLBACK'); // Rollback in case of error
      console.error('Error inserting/updating payment:', error.message);
      return res.status(500).json({ error: 'Failed to insert/update payment', details: error.message });
    } finally {
      client.release(); // Release the connection back to the pool
    }

    res.status(200).json({ url: checkoutUrl });
  } catch (error) {
    console.error('Error creating checkout session:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create checkout session', details: error.response ? error.response.data : error.message });
  }
});

app.get('/transactions', authenticateEmployeeToken, async (req, res) => {
  try {
    const branch_id = req.user.branch; // Extract branch_id from the decoded token (req.user)

    // Query to get transactions, filtered by branch_id
    const result = await pool.query(`
      SELECT 
        i.invoice_id, 
        o.customer_id, 
        o.employee_id, 
        e.firstname, 
        e.lastname, 
        i.totalamount, 
        i.invoicedate, 
        i.paymentmethod, 
        b.branchname 
      FROM ordertbl o
      JOIN invoicetbl i ON o.order_id = i.order_id
      JOIN branchtbl b ON o.branch_id = b.branch_id
      JOIN employeetbl e ON o.employee_id = e.employee_id
      WHERE o.branch_id = $1
      ORDER BY i.invoicedate DESC
    `, [branch_id]); // Pass the branch_id dynamically into the query

    const transactions = result.rows;
    res.json(transactions); // Send the results back as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transactions' }); // Handle any errors
  }
});

// POST endpoint to handle form submission
app.post('/submit-survey', async (req, res) => {
  const {
    name,
    age,
    visitFrequency,
    branch,
    reasonForChoice,
    otherReason,
    serviceSatisfaction,
    badExperience,
    recommend,
    foodRating,
    drinksRating,
    menuRating,
    servingRating,
    foodQualityRating,
    customerServiceRating,
    ambianceRating,
    priceRating,
    comments,
  } = req.body;

  try {
    const query = `
      INSERT INTO feedbacktbl (
        name, age, visit_frequency, branch, reason_for_choice, other_reason,
        service_satisfaction, bad_experience, recommend, food_rating, drinks_rating, 
        menu_rating, serving_rating, food_quality_rating, customer_service_rating, 
        ambiance_rating, price_rating, comments
      ) 
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      ) RETURNING *;
    `;
    const values = [
      name, age, visitFrequency, branch, reasonForChoice, otherReason, serviceSatisfaction,
      badExperience, recommend, foodRating, drinksRating, menuRating, servingRating,
      foodQualityRating, customerServiceRating, ambianceRating, priceRating, comments,
    ];
    
    const result = await pool.query(query, values);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/products', async (req, res) => {
  const branchId = req.query.branch_id; // Get the branch_id from query params

  try {
    // Use the SQL query provided to get available products for branch_id = 2
    const result = await pool.query(`
      SELECT m.menu_id, m.itemname, m.price, m.description, m.imageurl, c.categoryname
      FROM menutbl m
      JOIN availablemenutbl a ON m.menu_id = a.menu_id
      JOIN categorytbl c ON m.category_id = c.category_id
      WHERE a.available = true AND a.branch_id = $1
    `,[branchId]);

    const products = result.rows;

    // Map the result to match your Flutter Product model
    const mappedProducts = products.map(product => ({
      menu_id: product.menu_id,
      name: product.itemname,
      description: product.description,
      image: product.imageurl,
      price: product.price,
      category: product.categoryname,
      quantity: 1, // Default quantity
    }));

    res.json(mappedProducts);  // Send the data to the frontend
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/favorites', authenticateToken, async (req, res) => {
  const { product_id } = req.body;
  const customer_id = req.user.customer_id;

  try {
    const checkExistenceQuery = `
      SELECT * FROM favoritestbl WHERE customer_id = $1 AND product_id = $2
    `;
    const result = await pool.query(checkExistenceQuery, [customer_id, product_id]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    const query = `
      INSERT INTO favoritestbl (customer_id, product_id)
      VALUES ($1, $2) RETURNING *;
    `;
    const newFavorite = await pool.query(query, [customer_id, product_id]);
    res.status(201).json(newFavorite.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a product from favorites
app.delete('/favorites', authenticateToken, async (req, res) => {
  const { product_id } = req.body;
  const customer_id = req.user.customer_id;

  try {
    const query = `
      DELETE FROM favoritestbl WHERE customer_id = $1 AND product_id = $2 RETURNING *;
    `;
    const deletedFavorite = await pool.query(query, [customer_id, product_id]);

    if (deletedFavorite.rowCount === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Product removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all favorite products for a customer
app.get('/favorites/:customer_id', authenticateToken, async (req, res) => {
  const customer_id = req.params.customer_id;

  try {
    const query = `
      SELECT product_id FROM favoritestbl WHERE customer_id = $1;
    `;
    const favorites = await pool.query(query, [customer_id]);
    res.status(200).json(favorites.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const generateOrderNumber = () => {
  // Get the current date in YYYYMMDD format
  const date = new Date().toISOString().split('T')[0].replace(/-/g, ''); 

  // Generate a random 3-digit number
  const randomNumber = Math.floor(Math.random() * 900) + 100;  // Random number between 100 and 999

  // Combine them into the order number
  return `OI${date}${randomNumber}`;
};

const checkIfOrderItemIdExists = async (orderitem_id) => {
  const query = 'SELECT 1 FROM orderitemtbl WHERE orderitem_id = $1 LIMIT 1';
  const result = await pool.query(query, [orderitem_id]);

  // If the result is not empty, that means the ID exists
  return result.rows.length > 0;
};

app.post('/customer/orders', async (req, res) => {
  const { orderNumber, orderType, selectedBranch, cartItems, customerId, totalPrice, specialRequest } = req.body;

  try {
    // Insert order into the ordertbl
    const orderQuery = `
      INSERT INTO ordertbl (order_id, customer_id, branch_id, status, type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const orderValues = [orderNumber, customerId, selectedBranch, 'Preparing', orderType];

    const orderResult = await pool.query(orderQuery, orderValues);

    const invoiceQuery = `
      INSERT INTO invoicetbl (invoice_id, order_id, invoicedate, totalamount, paymentmethod)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const invoiceNumber = orderNumber.replace("ORD", "INV");
    const today = new Date().toISOString().split('T')[0];
    const invoiceValues = [invoiceNumber, orderNumber, today, totalPrice, 'Gcash'];

    const invoiceResult = await pool.query(invoiceQuery, invoiceValues);

    // Loop through cartItems and insert each item into the orderitemtbl
    for (const item of cartItems) {
      const { menu_id, quantity, price } = item;

      let orderitem_id;
      let idExists = true;

      // Loop until we generate a unique orderitem_id
      while (idExists) {
        orderitem_id = generateOrderNumber();
        idExists = await checkIfOrderItemIdExists(orderitem_id);
      }

      // Insert the order item into orderitemtbl
      const itemQuery = `
        INSERT INTO orderitemtbl (orderitem_id, order_id, menu_id, quantity, price_total, total_amount, note)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const cartValues = [orderitem_id, orderNumber, menu_id, quantity, price, price * quantity, specialRequest];
      
      const cartResult = await pool.query(itemQuery, cartValues);
    }

    // Send success response with the inserted order details
    res.status(201).json({ message: 'Order placed successfully!', order: orderResult.rows[0] });
  } catch (error) {
    console.error('Error inserting order:', error);
    res.status(500).json({ message: 'Failed to place order.' });
  }
});

app.get('/customer/order-history/:customerId', async (req, res) => {
  const { customerId } = req.params;

  try {
    // Query to fetch order history from the database
    const query = `
      SELECT 
        o.order_id,         -- Order ID from ordertbl
        o.status,           -- Status of the order from ordertbl
        o.branch_id,        -- Branch ID from ordertbl
        o.type,             -- Order type from ordertbl
        inv.invoicedate,    -- Invoice date from invoicetbl
        inv.totalamount,    -- Total amount from invoicetbl
        oi.menu_id,         -- Menu ID from orderitemtbl
        oi.quantity,        -- Quantity from orderitemtbl
        oi.price_total,     -- Price total from orderitemtbl
        m.itemname,          -- Item name from menutbl
        b.branchname
      FROM ordertbl o
      JOIN invoicetbl inv ON o.order_id = inv.order_id  -- Join with invoicetbl based on order_id
      JOIN orderitemtbl oi ON o.order_id = oi.order_id  -- Join with orderitemtbl based on order_id
      JOIN menutbl m ON oi.menu_id = m.menu_id
      JOIN categorytbl c ON m.category_id = c.category_id
      JOIN branchtbl b ON o.branch_id = b.branch_id
      WHERE o.customer_id = $1  -- Filter for customer ID
      ORDER BY inv.invoicedate DESC;
    `;

    const result = await pool.query(query, [customerId]);

    // Group the items by order ID and prepare the response data
    const orders = {};

    result.rows.forEach(row => {
      if (!orders[row.order_id]) {
        orders[row.order_id] = {
          orderID: row.order_id,
          date: row.invoicedate,  // Use invoicedate from the query
          orderDetails: [],
          amount: row.totalamount, // Assuming price_total is the total for that row (adjust if needed)
          status: row.status,
          branchname: row.branchname,
        };
      }
      // Group the items for each order
      orders[row.order_id].orderDetails.push({
        itemName: row.itemname,
        quantity: row.quantity,
        priceTotal: row.price_total,
      });
    });

    const ordersArray = Object.values(orders);

    res.status(200).json(ordersArray);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Failed to fetch order history' });
  }
});

// Fetch user's favorite items
app.get('/customers/:customerId/favorites', authenticateToken, async (req, res) => {
  const { customerId } = req.params;

  try {
    const result = await pool.query(
      'SELECT f.menu_id, m.itemname, m.price, m.imageurl, c.categoryname FROM favoritetbl f JOIN menutbl m ON f.menu_id = m.menu_id JOIN categorytbl c ON m.category_id = c.category_id WHERE customer_id = $1',
      [customerId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

const generateFavoriteId = () => {
  const randomNumbers = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit random number
  return `FAV${randomNumbers}`;
}

// Add a product to favorites
app.post('/customers/:customerId/favorites', authenticateToken, async (req, res) => {
  const { customerId } = req.params;
  const { menu_id } = req.body;

  if (!menu_id) {
    return res.status(400).json({ message: 'menu_id is required' });
  }

  try {
    favorite_id = generateFavoriteId();
    const result = await pool.query(
      'INSERT INTO favoritetbl (favorite_id, customer_id, menu_id) VALUES ($1, $2, $3) RETURNING *',
      [favorite_id, customerId, menu_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Failed to add favorite' });
  }
});

// Remove a product from favorites
app.delete('/customers/:customerId/favorites/:menuId', authenticateToken, async (req, res) => {
  const { customerId, menuId } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM favoritetbl WHERE customer_id = $1 AND menu_id = $2 RETURNING *',
      [customerId, menuId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
});

app.post('/api/recommend', async (req, res) => {
  const { customer_id, branch_id } = req.body;

  if (!customer_id) {
      return res.status(400).json({ error: 'Customer ID is required.' });
  }

  try {
      // Query orders and favorites
      const ordersQuery = "SELECT o.customer_id, oi.menu_id FROM orderitemtbl oi JOIN ordertbl o ON oi.order_id = o.order_id;";
      const favoritesQuery = "SELECT customer_id, menu_id FROM favoritetbl;";

      const ordersResult = await pool.query(ordersQuery);
      const favoritesResult = await pool.query(favoritesQuery);

      // Combine query results
      const ordersData = ordersResult.rows;
      const favoritesData = favoritesResult.rows;

      // Prepare data for Python
      const dataForPython = JSON.stringify({ customer_id, orders: ordersData, favorites: favoritesData });

      // Call the Python script
      const pythonProcess = spawn('python', [scriptPath]);
      let result = '';

      // Send data to Python script
      pythonProcess.stdin.write(dataForPython);
      pythonProcess.stdin.end();

      // Capture Python script output
      pythonProcess.stdout.on('data', (data) => {
          result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
          console.error(`Python error: ${data}`);
          res.status(500).json({ error: 'Error processing recommendations.' });
      });

      pythonProcess.on('close', async (code) => {
          if (code !== 0) {
              return res.status(500).json({ error: 'Python script failed.' });
          }

          try {
              const recommendations = JSON.parse(result);

              // Step 2: Query the database to get detailed information for each recommended menu_id
              const menuDetailsPromises = recommendations.recommendations.map(async (menu_id) => {
                  const query = `
                      SELECT m.menu_id, m.itemname, m.price, m.description, m.imageurl, c.categoryname
                      FROM menutbl m
                      JOIN availablemenutbl a ON m.menu_id = a.menu_id
                      JOIN categorytbl c ON m.category_id = c.category_id
                      WHERE a.available = true AND a.branch_id = $1 AND m.menu_id = $2
                  `;
                  const values = [branch_id, menu_id];
                  const result = await pool.query(query, values);
                  return result.rows[0];  // Return the first match for each recommended item
              });

              // Wait for all menu detail queries to finish
              const menuDetails = await Promise.all(menuDetailsPromises);
              const filteredMenuDetails = menuDetails.filter(item => item !== undefined);

              // Step 3: Send back the detailed menu information to the frontend
              res.json({ customer_id, recommendations: filteredMenuDetails });
          } catch (err) {
              console.error('Error parsing Python result or fetching menu details:', err);
              res.status(500).json({ error: 'Error processing recommendations or fetching menu details.' });
          }
      });
  } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch data.' });
  }
});

app.put('/api/order-received/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: 'order_id is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE ordertbl SET status = $1 WHERE order_id = $2',
      [status, orderId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({message: 'Order received successfully'});
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Failed to change order details' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});