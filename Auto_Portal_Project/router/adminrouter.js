const router=require("express").Router()
const Admin=require("../model/admin")
const jwt=require("jsonwebtoken")
const aauth=require("../middleware/aauth")
const Category=require("../model/categories")
const multer=require("multer")
const Product=require("../model/product")
var storage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,"./public/pimage")
    },
    filename:function(req,file,cb){
        cb(null,file.filename + "-" +Date.now()+".jpg")
    }
})
var upload=multer({
    storage:storage
}).single("img")

router.get("/admin",(req,resp)=>{
    resp.render("adminlogin")
})
router.get("/adminhome",aauth,(req,resp)=>{
    resp.render("adminhome")
})

router.post("/adminlogin",async(req,resp)=>{
    try {
        const admin= await Admin.findOne({email:req.body.email})
        if(admin.pass==req.body.pass)
        {
            const token=await jwt.sign({_id:admin.id},process.env.PKEY)
            resp.cookie("ajwt",token)
            resp.redirect("adminhome")
        }
        else{
            resp.render("adminlogin",{err:"invalid credentials"})
        }
    } catch (error) {
        resp.render("adminlogin",{err:"invalid credentials"})
    }
})

router.get("/category",async(req,resp)=>{
    try {
        const catdata=await Category.find();
        resp.render("category",{catdata:catdata})
    } catch (error) {
        
    }
    
})

router.post("/addcategory",async(req,resp)=>{
    try {
        const cat=new Category(req.body)
        await cat.save();
        resp.redirect("category")
    } catch (error) {
        console.log(error);
    }
})

/**********PRoduct*************** */
router.get("/product",async(req,resp)=>{
    try {
        const catdata= await Category.find()
        const pdata=await Product.find()
    resp.render("product",{catdata:catdata,pdata:pdata})
    } catch (error) {
        
    }
    
})

router.post("/addproduct",upload,async(req,resp)=>{
    try {
        const prod=new Product({catid:req.body.catid,name:req.body.name,price:req.body.price,qty:req.body.qty,img:req.file.filename})
    
        const data=prod.save()
        resp.redirect("product",)
    } catch (error) {
        
    }
})
const Order=require("../model/order")
router.get("/orderlist",async(req,resp)=>{
    try {
        const orderdata= await Order.find()
        
    resp.render("orderlist",{orderdata:orderdata})
    
    } catch (error) {
        console.log(error);
    }
    
})

module.exports=router