const jwt= require("jsonwebtoken")
const user =require("../model/users")

const auth=async(req,resp,next)=>{
    try {
         const token=req.cookies.jwt
         const data=await jwt.verify(token,process.env.PKEY)
         const userdata=await user.findOne({_id:data._id})
         
            if(data)
   {        
            req.user=userdata;
            req.token=token
            next()
   }

    } catch (error) {
        console.log(error);
        resp.render("login",{err:"Please Login First"})
    }
}

module.exports =auth