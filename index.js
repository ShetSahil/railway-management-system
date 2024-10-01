require('dotenv').config();

const express = require('express');
const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// require('dotenv').config();
// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// app.use(express.json());

// // MySQL connection setup
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'api',
//     password: 'api',
//     database: 'railway_management'
// });

// db.connect(err => {
//     if (err) throw err;
//     console.log('MySQL connected...');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

// //

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 8);
//     const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    
//     db.query(sql, [name, email, hashedPassword], (err, result) => {
//         if (err) return res.status(500).send('Error registering the user');
//         res.send('User registered successfully');
//     });
// });


// //

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const sql = `SELECT * FROM users WHERE email = ?`;

//     db.query(sql, [email], (err, results) => {
//         if (err) return res.status(500).send('Error on the server');
//         if (results.length === 0) return res.status(404).send('No user found');

//         const user = results[0];
//         const passwordIsValid = bcrypt.compareSync(password, user.password);

//         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

//         const token = jwt.sign({ id: user.id }, 'supersecret', { expiresIn: 86400 });
//         res.status(200).send({ auth: true, token });
//     });
// });


// //

// // Middleware to verify admin API key
// function verifyAdmin(req, res, next) {
//     const apiKey = req.headers['x-api-key'];
//     if (apiKey === 'Sahil') {
//         next();
//     } else {
//         res.status(403).send('Forbidden');
//     }
// }

// app.post('/admin/trains', verifyAdmin, (req, res) => {
//     const { name, source, destination, total_seats } = req.body;
//     const sql = `INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)`;
    
//     db.query(sql, [name, source, destination, total_seats, total_seats], (err, result) => {
//         if (err) return res.status(500).send('Error adding the train');
//         res.send('Train added successfully');
//     });
// });


// //

// app.get('/trains', (req, res) => {
//     const { source, destination } = req.query;
//     const sql = `SELECT * FROM trains WHERE source = ? AND destination = ?`;

//     db.query(sql, [source, destination], (err, results) => {
//         if (err) return res.status(500).send('Error fetching trains');
//         res.send(results);
//     });
// });


// //

// app.post('/book', (req, res) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).send('Token is required');

//     jwt.verify(token, 'supersecret', (err, decoded) => {
//         if (err) return res.status(500).send('Failed to authenticate token');
        
//         const { user_id } = decoded;
//         const { train_id } = req.body;

//         db.query(`SELECT available_seats FROM trains WHERE id = ?`, [train_id], (err, results) => {
//             if (err) return res.status(500).send('Error checking availability');
//             if (results[0].available_seats <= 0) return res.status(400).send('No seats available');

//             db.beginTransaction(err => {
//                 if (err) return res.status(500).send('Transaction failed');

//                 db.query(`UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?`, [train_id], (err) => {
//                     if (err) return db.rollback(() => res.status(500).send('Booking failed'));

//                     db.query(`INSERT INTO bookings (user_id, train_id, seat_no) VALUES (?, ?, ?)`, 
//                     [user_id, train_id, results[0].available_seats], (err, result) => {
//                         if (err) return db.rollback(() => res.status(500).send('Booking failed'));

//                         db.commit(err => {
//                             if (err) return db.rollback(() => res.status(500).send('Booking failed'));
//                             res.send('Booking successful');
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });


// //

// app.get('/booking/:id', (req, res) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).send('Token is required');

//     jwt.verify(token, 'supersecret', (err, decoded) => {
//         if (err) return res.status(500).send('Failed to authenticate token');

//         const { id: user_id } = decoded;
//         const booking_id = req.params.id;

//         const sql = `SELECT * FROM bookings WHERE id = ? AND user_id = ?`;
//         db.query(sql, [booking_id, user_id], (err, result) => {
//             if (err) return res.status(500).send('Error fetching booking');
//             if (result.length === 0) return res.status(404).send('Booking not found');
//             res.send(result[0]);
//         });
//     });
// });






//

