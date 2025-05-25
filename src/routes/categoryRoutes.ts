import express from "express"
import * as category from "@app/controllers/categoryController"

const categories = express.Router()

categories.get('/', category.getCategories)
categories.get('/:id', category.getCategory)
categories.post('/newCategory', category.createCategory)
categories.put('/:id',category.updateCategory )
categories.delete('/:id', category.deleteCategory)

export default categories