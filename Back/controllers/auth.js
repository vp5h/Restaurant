const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");
const Employee = require("../models/employee");

exports.singnup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const employee = new Employee(req.body);
  employee.save((err, employee) => {
    if (err) {
      return res.status(400).json({
        error: "User Already Exists",
      });
    }
    res.json({
      name: employee.name,
      email: employee.email,
      id: employee._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  Employee.findOne({ email }, (err, employee) => {
    if (err || !employee) {
      return res.status(400).json({
        error: "employee email Does Not Exist",
      });
    }
    if (!employee.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password Do Not Match",
      });
    }
    //Create TOken
    const token = jwt.sign({ _id: employee._id }, process.env.SECRET);
    //Put token
    res.cookie("token", token, { expire: new Date() + 99 });
    //Send Response
    const { _id, name, email, role } = employee;
    return res.json({ token, employee: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "employee SignOut Sucessfull",
  });
};
//protected Routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//middle wares Custom
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  const a=req.profile
  if (!checker) {
    
    console.log(a)
    return res.status(403).json({
      
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      error: "You are Not ADMIN, Access Denied",
    });
  }

  next();
};
