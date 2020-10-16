var express = require('express');
var router = express.Router()
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getEmployeeById, getEmployee, updateEmployee, EmployeePurchaseList} = require("../controllers/employee")

router.param("employeeId", getEmployeeById)

router.get("/employee/:employeeId", isSignedIn, isAuthenticated, getEmployee)
router.put("/employee/:employeeId", isSignedIn, isAuthenticated, updateEmployee)
router.get("/orders/employee/:employeeId", isSignedIn, isAuthenticated, EmployeePurchaseList)

module.exports = router;