const express = require("express")
const router= express.Router()

const {getMenubyId, createMenu, getMenu, photo, deleteMenu, updateMenu, getAllMenus} = require("../controllers/menu")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getEmployeeById} = require("../controllers/employee")

router.param("employeeId", getEmployeeById);
router.param("menuId", getMenubyId);

//create Route
router.post(
    "/menu/create/:employeeId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createMenu
  );
  //read route
  router.get("/menu/:menuId", getMenu);
  router.get("/menu/photo/:menuId", photo);

  //delete Routes
  router.delete("/menu/:menuId/:employeeId",  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteMenu
  )
   //update Route
  router.put("/menu/:menuId/:employeeId",  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateMenu
  )
 

  //Listing route
  router.get("/menus", getAllMenus)

 
module.exports = router;