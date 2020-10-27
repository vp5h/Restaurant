const express = require("express")
const router= express.Router()
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getEmployeeById, pushOrderInPurchaseList} = require("../controllers/employee")
const {updateStock} = require("../controllers/menu")

const {getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus} = require("../controllers/order")


router.param("employeeId", getEmployeeById,);
router.param("orderId", getOrderById);

//create
router.post("/order/create/:employeeId", isSignedIn, isAuthenticated, createOrder)
//read

router.get("/order/all/:employeeId", isSignedIn, isAuthenticated, isAdmin, getAllOrders )

//status
router.get("/order/status/:employeeId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:employeeId", isSignedIn, isAuthenticated, isAdmin, updateStatus)
module.exports = router;