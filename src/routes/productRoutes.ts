import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "@app/controllers/productController"
import  express from "express"

const product = express.Router()

product.get('/', getProducts)
product.get('/:id', getProduct)
product.post('/newProduct', createProduct)
product.put('/:id', updateProduct)
product.delete('/:id', deleteProduct)


export default product