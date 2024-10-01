const express = require('express');
const { addTrain, getTrains } = require('../controllers/train');
const verifyAdmin = require('../middlewares/admin');

const router = express.Router();

router.post('/admin/trains', verifyAdmin, addTrain); // it is to route to the endpoint where admin can  update the  trains in the DB by adding them
router.get('/', getTrains); // This is to get all the available trains between mentioned source and destination

module.exports = router;
