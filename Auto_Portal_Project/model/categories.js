const mongoose=require("mongoose")

const catyegorySchema=new mongoose.Schema({
    catname:{
        type:String
    }
})

module.exports=mongoose.model("Category",catyegorySchema)