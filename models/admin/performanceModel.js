const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types;



const performanceSchema = new mongoose.Schema(
    {
        category:{
            type:String,
            required:true,
        },
        symbol:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        price:{
            type:String,
            required:true,
        },
        priceChange:{
            type:String,
            required:true,
        },
        percentChange:{
            type:String,
            required:true,
        },
        shares:{
            type:String,
           default:"",
        },
        pricePaid:{
            type:String,
            required:true,
        },
        costBasis:{
            type:String,
            required:true,
        },
        marketValue:{
            type:String,
            required:true,
        },
        gainLoss:{
            type:String,
            required:true,
        },
        weight:{
            type:String,
            required:true,
        },
        faceValue:{
            type:String,
            default:"",
        },
        weightAverageReturn:{
            type:String,
            default:""
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

module.exports = mongoose.model("Performance", performanceSchema)