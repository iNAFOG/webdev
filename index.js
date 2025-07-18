const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");
const link = process.env.link;
const app =  express();
app.use(express.json());

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

async function main(){
    await mongoose.connect(link)
    app.listen(3000);
    console.log("listening on port 3000")
}
