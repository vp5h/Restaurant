require('dotenv').config();


const mongoose =require("mongoose");
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My ROutes
// const userRoutes = require("./routes/user.js")
 const authRoutes = require("./routes/auth.js");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const orderRoutes = require("./routes/order");



mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}).then(()=>{
    console.log("DB CONNECTED")
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//My Routes
 app.use("/api", authRoutes);
// app.use("/api", userRoutes)
// app.use("/api", categoryRoutes)
// app.use("/api", productRoutes)
// app.use("/api", orderRoutes)
//PORT

const port = process.env.PORT || 8000;


//Starting a sever
app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
})