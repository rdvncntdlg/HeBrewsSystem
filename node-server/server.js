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
  database: 'he_brews',
  password: 'password',
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
      const result = await pool.query('SELECT customerid, firstname, lastname, password, username FROM customer WHERE username = $1', [username]);
      const user = result.rows[0];

      if (user && user.password === password) {
          // Instead of session, generate a token (could use JWT or something else)
          const token = jwt.sign(
            { customerId: user.customerid, username: user.username }, 
            secretKey, 
            { expiresIn: '1h' } // Set token expiration time
          );
           // This should be a real token in a production environment

          res.json({ 
              success: true, 
              message: 'Login successful', 
              token, // Return token to client
              customerId: user.customerid, 
              firstname: user.firstname,

          });
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

  if (token == null) return res.status(401).json({ success: false, message: 'Token is missing' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Forbidden' });
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, username, password, address, phone } = req.body;
  
    if (!firstName || !lastName || !email || !username || !password || !address || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
  
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Insert the user and get the new customer_id
      const result = await pool.query(
        `INSERT INTO customer (firstname, lastname, email, username, password, address, phonenumber)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING customerid`,
        [firstName, lastName, email, username, hashedPassword, address, phone]
      );
  
      const customerId = result.rows[0].customerid;
  
      // Format the ID as CUS00001, CUS00002, etc.
      const formattedId = `CUS${String(customerId).padStart(5, '0')}`;
  
      // Update the customer record with the formatted ID
      await pool.query(
        `UPDATE customer SET customer_id_formatted = $1 WHERE customerid = $2`,
        [formattedId, customerId]
      );
  
      res.status(200).json({ success: true, message: 'Registration successful', customerId: formattedId });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, message: 'Server error', details: error.message });
    }
  });

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.post('/profile/update', async (req, res) => {
  const { customerid, firstname, username } = req.body;

  try {
      const result = await pool.query(
          'UPDATE customer SET firstname = $1, username = $2 WHERE customerid = $3 RETURNING *',
          [firstname, username, customerid]
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
    const result = await pool.query('SELECT * FROM customer ORDER BY customerid');
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
    const result = await pool.query('SELECT * FROM customer WHERE customerid = $1', [id]);
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
      'INSERT INTO customer (firstname, lastname, email, address, username, password, phonenumber) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
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
    const customerQuery = await pool.query('SELECT password FROM customer WHERE customerid = $1', [id]);

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
      'UPDATE customer SET firstname = $1, lastname = $2, email = $3, address = $4, username = $5, password = $6, phonenumber = $7 WHERE customerid = $8 RETURNING *',
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
    const result = await pool.query('DELETE FROM customer WHERE customerid = $1 RETURNING *', [id]);
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
    const query = 'INSERT INTO products (name, price, category, category_id, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *';
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
    const result = await pool.query('SELECT * FROM products ORDER BY id');
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
      UPDATE products
      SET name = $1, price = $2, image_path = $3
      WHERE id = $4
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
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
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





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
