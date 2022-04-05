const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true
    },
    productOwnerID:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
    updatedAt:{
        type: Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Products', productSchema);