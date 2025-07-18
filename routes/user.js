const {Router} =  require("express");
const { userModel } =  require("../db");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config")

const userRouter = Router();

userRouter.post("/signup",async function(req,res){
    const {email , password, firstName , lastName } =  req.body;
    
    await userModel.create({
        email : email,
        password : password,
        firstName :  firstName,
        lastName :  lastName
    })
    
    res.json({
        message : "signup succeded"
    })
})

userRouter.post("/signin",async function(req,res){
    const { email , password } = req.body;

    //ideally pass should be hashed and we this implies we cannot comapre the user provided pass with the one in the db
    
    const user = await userModel.findOne({
        email : email,
        password : password
    })

    if(user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: token
        })
    }

    else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
    
})

userRouter.post("/purchase",function(req,res){
    res.json({
        message : "signup endpoint"
    })
})

module.exports = {
    userRouter: userRouter

}