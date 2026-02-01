const express = require('express');
const router = express.Router();
const { submitComplaint } = require('../../../controllers/user/Complaint Form/complaintformController');

// Route for submitting a complaint
router.post('/submit-complaint', submitComplaint);

module.exports = router;
