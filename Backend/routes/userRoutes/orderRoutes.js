const express = require('express')
const router = express.Router()
const authenticateUser = require("../../middleware/authMiddleware")
const {submitOrder,getOrderSummary} = require('../../controllers/user/OrderManagement/orderController')
const authMiddleware = require('../../middleware/authMiddleware');


router.post('/submit-order',authenticateUser,submitOrder);
router.get('/order-history',authMiddleware ,getOrderSummary);

module.exports = router