const Product = require('../models/product')

const product_controller = {}

// Create a new product
product_controller.create = async (req, res) => {
    try {
        const {name}=req.body
        //Check if a product with the same name  already exists
        const existingProduct = await Product.findOne({ $or: [{ name }] });
        if (existingProduct) {
            return res.status(409).json({ message: 'Product already exists' });
        }
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(500).send({ error: 'Failed to create product' })
    }
}

// Read all products
product_controller.getAll = async (req, res) => {
    try {
        const products = await Product.find({ isDelete: false })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch products' })
    }
}

// Read a single product by ID
product_controller.getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).send({ error: 'Product not found' })
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch product' })
    }
}

// Update a product by ID
product_controller.update = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updatedProduct) {
            return res.status(404).send({ error: 'Product not found' })
        }
        res.status(200).send(updatedProduct)
    } catch (error) {
        res.status(500).send({ error: 'Failed to update product' })
    }
}

// Delete a product by ID
product_controller.delete = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndUpdate(req.params.id, { isDelete: true }, { new: true })
        if (!deletedProduct) {
            return res.status(404).send({ error: 'Product not found' })
        }
        res.status(200).send({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete product' })
    }
}

// undo product
product_controller.undo = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true })
        if (!updatedProduct) {
            return res.status(404).send({ error: 'Product not found' })
        }
        res.status(200).send(updatedProduct)
    } catch (error) {
        res.status(500).send({ error: 'Failed to undo product' })
    }
}

// Read all deleted products
product_controller.getDeleted = async (req, res) => {
    try {
        const products = await Product.find({ isDelete: true })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch products' })
    }
}
module.exports = product_controller
