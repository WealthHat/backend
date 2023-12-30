const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;



const budgetSchema = new mongoose.Schema(
    {
        category:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        monthly:{
            type:String,
            required:true,
        },
        annually:{
            type:String,
            required:true,
        },
        user:{
            type:ObjectId,
            ref:'User'
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Budget", budgetSchema)