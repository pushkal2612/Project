const mongoose=require("mongoose")

const cartSchema=new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId
    },
    pid:{
        type:mongoose.Schema.Types.ObjectId
    },
    qty:{
        type:Number
    },
    total:{
        type:Number
    }
})
module.exports=new mongoose.model("cart",cartSchema)