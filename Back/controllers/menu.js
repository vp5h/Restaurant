const Menu = require("../models/menu")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

const { sortBy } = require("lodash")

exports.getMenubyId=(req, res, next, id)=>{
    Menu.findById(id)
    .exec((err,menu)=>{
        if(err){
            return res.status(300).json({
                error: "menu not found"
            })
        }
        req.menu= menu;
        next();
    })
}

exports.createMenu = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the Fields
      const {name, description, price, stock} = fields
      if(
          !name ||
          !price ||
          !stock||
          !description 
      ){
        return res.status(400).json({
          error: "Please Include all fields"
        })

      }
  
    
      let menu   = new Menu(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        menu.photo.data = fs.readFileSync(file.photo.path);
        menu.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      menu.save((err, menu) => {
        if (err) {
          res.status(400).json({
            error: "Saving item in DB failed"
          });
        }
        res.json(menu);
      });
    });
  }

exports.getMenu = (req, res) =>{
    req.menu.photo= undefined
    return res.json(req.menu)
  }

exports.photo=(req, res, next)=>{
    if(req.menu.photo.data){
      res.set("Content-Type", req.menu.photo.contentType)
      return res.send(req.menu.photo.data)
    }
    next();
  }  

exports.deleteMenu=(req, res)=>{
    let menu = req.menu
    menu.remove((err, deletedmenu)=>{
      if(err){
        return res.status(400).json(
          {
            error: "failed to delete the menu"
          }
        )
      }
      res.json({
        message: "Deletion Was a Success",
        deletedMenu
      })

    })  
  }


exports.updateMenu=(req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the Fields
     
  
      //Updation Code
      let menu = req.menu;
      menu=_.extend(menu, fields)
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        menu.photo.data = fs.readFileSync(file.photo.path);
        menu.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      menu.save((err, menu) => {
        if (err) {
          res.status(400).json({
            error: "Updation of Menu failed"
          });
        }
        res.json(menu);
      });
    });

  }

exports.getAllMenus=(req, res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit):8
    let sortBy= req.query.sortBy ? req.query.sortBy: "_id"
    Menu.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, menus)=>{
      if(err){
        return res.status(400).json({
          error: "No menu found"
        })
      }
      res.json(menus)
    })
  }

exports.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      updateStock=(req, res, next)=>{
  let myoperations= req.body.order.menus.map(prod=>{
    return{
      updateOne:{
        filter: {_id: prod._id},
        update: {$inc: {stock: -prod.count, sold: +prod.count}}
      }
    }
  })
Menu.bulkWrite(myoperations, {}, (err, menus)=>{
  if(err){
    return res.status(400).json({
      error: "bulk operation Failed"
    })
  }
  next()
})

}

