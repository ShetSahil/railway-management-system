const db = require('../config/db');

//  to book a seat and make sure if 2 users are booking the seats simultaneously then only either of them will be able to book the seats.
exports.bookSeat = (req, res) => {
    const user_id = req.userId;
    const { train_id } = req.body;

   
    db.beginTransaction((err) => {
        if (err) return res.status(500).send('Failed to start transaction');

        
        const lockQuery = `SELECT available_seats FROM trains WHERE id = ? FOR UPDATE`;
        db.query(lockQuery, [train_id], (err, results) => {
            if (err) {
                return db.rollback(() => res.status(500).send('Error locking row for train'));
            }

            const availableSeats = results[0]?.available_seats;
            if (availableSeats <= 0) {
                return db.rollback(() => res.status(400).send('No seats available'));
            }

            
            const updateSeatsQuery = `UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?`;
            db.query(updateSeatsQuery, [train_id], (err) => {
                if (err) {
                    return db.rollback(() => res.status(500).send('Failed to update seat availability'));
                }

                
                const bookQuery = `INSERT INTO bookings (user_id, train_id, seat_no) VALUES (?, ?, ?)`;
                db.query(bookQuery, [user_id, train_id, availableSeats], (err, result) => {
                    if (err) {
                        return db.rollback(() => res.status(500).send('Booking failed'));
                    }

                    
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => res.status(500).send('Failed to commit booking'));
                        }
                        res.send('Booking successful');
                    });
                });
            });
        });
    });
};


// to get specific booking details of the user who have booked the seats by using the authorization token received during login.
exports.getBooking = (req, res) => {
    const user_id = req.userId;
    const booking_id = req.params.id;

    const sql = `SELECT * FROM bookings WHERE id = ? AND user_id = ?`;
    db.query(sql, [booking_id, user_id], (err, result) => {
        if (err) return res.status(500).send('Error fetching booking');
        if (result.length === 0) return res.status(404).send('Booking not found');
        res.send(result[0]);
    });
};
