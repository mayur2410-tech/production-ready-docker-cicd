const express = require("express");
const router = express.Router();

const {getWorkerOrders,updateOrderStatus} = require("../../../controllers/worker/All-Orders/allorders")

router.get("/getallorderdetails",getWorkerOrders)
router.patch("/update-order-status/:orderId",updateOrderStatus)

module.exports = router