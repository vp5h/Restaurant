var express = require('express');
var router = express.Router()
const { check, validationResult } = require('express-validator');
const {signout,singnup, signin, isSignedIn} = require("../controllers/auth")



router.post("/signup",[
    check("name", "name should be atleast 3 chars").isLength({ min: 3}),
    check("email", "email is required").isEmail(),
    check("password", "Password should be at least 3 char").isLength({min: 3})
], singnup)

router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password", "Password Is Required").isLength({min: 1})
], signin)


router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) =>{
    res.json(req.auth);

});

module.exports = router;


