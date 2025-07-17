const {Router} = require("express")
const adminRouter = Router();
const {adminModel} = require("../db")
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup" ,async function(req, res){
    const {email , password, firstName , lastName } =  req.body;
    
    await adminModel.create({
        email : email,
        password : password,
        firstName :  firstName,
        lastName :  lastName
    })
    
    res.json({
        message : "signup succeded"
    })
})

adminRouter.post("/signin" ,async function(req, res){
    const { email , password } = req.body;

    //ideally pass should be hashed and we this implies we cannot comapre the user provided pass with the one in the db
    
    const admin = await adminModel.findOne({
        email : email,
        password : password
    })

    if(admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

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

adminRouter.post("/course" ,adminMiddleware,async function(req, res){
    const adminId = req.userId

    const {title,description,imageUrl,price} = req.body;

    await courseModel.create({
        title : title,
        description : description,
        imageUrl : imageUrl,
        price : price,
        creatorId : adminId
    })


    res.json({
        message: "course created",
        courseId : course._id
    })
})

adminRouter.put ("/course",adminMiddleware ,async function(req, res){
    const adminId = req.userId

    const {title,description,imageUrl,price,courseId} = req.body;

    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId  : adminId
    },{
        title : title,
        description : description,
        imageUrl : imageUrl,
        price : price,
    })


    res.json({
        message: "course created",
        courseId : course._id
    })
})

adminRouter.get("/course/bulk" ,adminMiddleware,async function(req, res){
    
    const adminId = req.userId;
    
    const courses = await courseModel.updateOne({
        _id : courseId,

    });


    res.json({
        message: "course created",
        courses
    })
})

module.exports = {
    adminRouter : adminRouter
}

