const Employee = require("../models/employee");
const Order = require("../models/order")

exports.getEmployeeById = (req, res, next, id) => {
    Employee.findById(id).exec((err, employee)=>{

        if(err || !employee){
            return res.status(400).json({
                error: "No employee was found in DB"
            })
        }
        req.profile = employee;
        next();
    })
};

exports.getEmployee = (req, res) => {
    req.profile.salt= undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}


exports.updateEmployee = (req, res) =>{
    Employee.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, employee)=>{
            if(err){
                return res.status(400).json({
                    Error: "Update Unsuccessfull"
                })
            }
            employee.salt= undefined;
            employee.encry_password = undefined;
            res.json(employee)
        }

    )
}

exports.EmployeePurchaseList=(req, res) =>{
    Order.find({employee: req.profile._id})
    .populate("employee", '_id name')
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                Error: "No Order Found" 
            })
        }
        return res.json(order)

    })
}

exports.pushOrderInPurchaseList= (req, res, next)=>{

    let purchases = []
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })
    //Store IN DB
    Employee.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases)=>{
            if(err){
                return res.status(400).json({
                    error: "Unable to save Purchase LIst"
                })
            }

        }
    )
    next()
    }



   
