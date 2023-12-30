const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    postedBy: {
      type: ObjectId,
      ref: 'Admin',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);
