const express = require('express');
const { bookSeat, getBooking } = require('../controllers/booking');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/book', verifyToken, bookSeat); // this routes to book a seat, requires JWT authentication toekn


router.get('/booking/:id', verifyToken, getBooking); // this is to route to get specific booking details by booking ID, also requires JWT authentication token

module.exports = router;
