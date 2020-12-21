var express = require('express');
var router = express.Router()
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getEmployeeById, getEmployee, updateEmployee, getOpEmployeeById, getAllemployees, deleteEmployee, createEmployee} = require("../controllers/employee")

router.param("employeeId", getEmployeeById)
router.param("opemployeeId", getOpEmployeeById)

router.get("/employee/:employeeId", isSignedIn, isAuthenticated, getEmployee)
router.put("/employee/:employeeId", isSignedIn, isAuthenticated, updateEmployee)
// router.get("/orders/employee/:employeeId", isSignedIn, isAuthenticated, EmployeePurchaseList)
// router.get("/employees/:employeeId", isSignedIn, isAuthenticated, getAllemployees)
router.delete("/employees/:employeeId/:opemployeeId", isSignedIn, isAuthenticated, deleteEmployee)
router.get("/employees/:employeeId", isSignedIn, isAuthenticated, isAdmin, getAllemployees)

module.exports = router;