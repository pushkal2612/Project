const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    uid :{
        type : mongoose.Schema.Types.ObjectId
    },
    pid : {
        type:String
    },
    product : [{
        pname :{
            type : String
        },
        price : {
            type : Number
        },
        qty : {
            type : Number
        }
    }],
    Date : {
        type : Date,
        default : Date.now()
    }
})

module.exports=new mongoose.model("Order",orderSchema)