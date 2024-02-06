const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    catid:{
       type:mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String
    },
    price:{
        type:Number
    },
    qty:{
        type:Number
    },
    img:{
        type:String
    }
})

module.exports=mongoose.model("product",productSchema)