const  Order = require("../models/order");
const { orderBy } = require("lodash");



exports.getOrderById = (req, res, next, id)=>{
    Order.findById(id)
    .populate("menus.menu", "name price")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "No order foound in Db"
            });
        }
        req.order= order;
        next();
    })
}

exports.createOrder = (req, res)=>{
    req.body.order.employee = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "failed to save your Order IN DB"
                
            }
            ) 
        }
        res.json(order);
     })


    

}
exports.getAllOrders=(req, res)=>{
    Order.find()
    .populate("employee", "_id name")
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: "No Orders Found in DB"
            })
        }
        res.json(order)
    })
}

exports.getOrderStatus=(res, req)=>{
res.json(Order.schema.path("status").enumValues)
}
exports.updateStatus=(res, req)=>{
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.boody.status}},
        (err, order)=>{
            if(err){
            return res.status(400).json({
                error: "Cannot update order status"
            });
        }
        res.json(order)
    })
}