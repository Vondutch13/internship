const express = require('express')
const router = express.Router()
const verify = require('./verifyToken')
const Products = require('../models/productsDb')
const { date } = require('joi')

router.get('/', verify, (req,res) => {
    res.send(req.user._id)
})

//view products
router.get('/viewProducts', verify, async(req,res) =>{
    try{
        const productz = await Products.find()
        res.json(productz)
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
})


//createProduct
router.post('/', verify, async(req,res)=>{
    
        const productInfo = new Products({
            name:req.body.name,
            price:req.body.price,
            productOwnerID:req.body.productOwnerID
        })
    try{
        const addProduct = await productInfo.save()
        res.status(201).json(addProduct)

    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//delete
router.delete('/:id', getProduct, async (req, res) =>{
    try{
        await res.productx.remove()
        res.json({message:'Product Deleted'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


//update product
router.patch('/:id', getProduct, async (req, res) =>{
    if(req.body.name != null){
        res.productx.name = req.body.name
    }
    if(req.body.price != null){
        res.productx.price = req.body.price
    }
    

    try{
        const updateProduct =  await res.productx.save()
        res.json(updateProduct)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})



//generalfunction for getting the user

async function getProduct (req, res, next){
 let productx

    try{
        productx = await Products.findById(req.params.id)
        if(productx == null){
            return res.status(404).json({message:'Product do not exist'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.productx = productx
    next()

}


module.exports = router;