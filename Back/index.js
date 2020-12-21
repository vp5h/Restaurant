require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My ROutes
 const employeeRoutes = require("./routes/employee.js")
const authRoutes = require("./routes/auth.js");
// const categoryRoutes = require("./routes/category");
 const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//My Routes
app.use("/api", authRoutes);
app.use("/api", employeeRoutes)
// app.use("/api", categoryRoutes)
 app.use("/api", menuRoutes)
 app.use("/api", orderRoutes)
//PORT

const port = process.env.PORT || 8000;

//Starting a sever
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
