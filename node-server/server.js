const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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
  user: 'postgres',
  host: 'localhost',
  database: 'hebrews',
  password: 'admin1234',
  port: 5432,
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
        position: user.position // Include position in the token payload
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


app.get('/api/branches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM branches');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
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
      'UPDATE branches SET image = $1, name = $2, address = $3, icon = $4 WHERE id = $5 RETURNING *',
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
      'INSERT INTO branches (name, address, image, icon) VALUES ($1, $2, $3, $4) RETURNING *',
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
    const result = await pool.query('DELETE FROM branches WHERE id = $1', [id]);

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
  const { productId, orderId } = req.body;

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
    const result = await pool.query(
      'INSERT INTO orderitemtbl (order_id, menu_id) VALUES ($1, $2) RETURNING *',
      [orderId, productId]
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
    // Logic to increase quantity in the database
    await pool.query('UPDATE orderitemtbl SET quantity = quantity + 1 WHERE orderitem_id = $1', [orderitem_id]);
    res.status(200).send('Quantity increased');
  } catch (error) {
    console.error('Error increasing quantity:', error);
    res.status(500).send('Error increasing quantity');
  }
});

// Decrease item quantity
app.post('/api/order/decrease/:orderitem_id', async (req, res) => {
  const { orderitem_id } = req.params;
  try {
    // Logic to decrease quantity (ensure it doesn't go below 1)
    await pool.query('UPDATE orderitemtbl SET quantity = GREATEST(quantity - 1, 1) WHERE orderitem_id = $1', [orderitem_id]);
    res.status(200).send('Quantity decreased');
  } catch (error) {
    console.error('Error decreasing quantity:', error);
    res.status(500).send('Error decreasing quantity');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
