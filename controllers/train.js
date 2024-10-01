const db = require('../config/db');

// to add a new train (Admin only) using the x-api-key that is only known to the admin
exports.addTrain = (req, res) => {
    const { name, source, destination, total_seats } = req.body;
    const sql = `INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(sql, [name, source, destination, total_seats, total_seats], (err, result) => {
        if (err) return res.status(500).send('Error adding the train');
        res.send('Train added successfully');
    });
};

//to get availability of seats between the source and destination entered 
exports.getTrains = (req, res) => {
    const { source, destination } = req.query;
    const sql = `SELECT * FROM trains WHERE source = ? AND destination = ?`;

    db.query(sql, [source, destination], (err, results) => {
        if (err) return res.status(500).send('Error fetching trains');
        res.send(results);
    });
};
