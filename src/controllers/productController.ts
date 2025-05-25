import { Response } from "express";
import asyncHandler from "@app/middleware/asyncHandler/asyncHandler";
import * as productModel from "@app/models/productModel"
import { UserRequest } from "@app/utils/types/userTypes";
import { User } from "@app/models/authModel";

// get all products
export const getProducts = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);

    } catch (error: unknown) {
        console.error('Error Fetching Products:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
})
//get a single product
export const getProduct = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productModel.getProductById(id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json(product);

    } catch (error: unknown) {
        console.error('Error Fetching Product:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });


    }
})

//add a new product 
export const createProduct = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const { name, description, price, category_id, image_url, stock_quantity } = req.body;

        if (!name || !description || !price || !category_id || !image_url || !stock_quantity) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const newProduct = await productModel.addProduct({
            name,
            description,
            price,
            category_id,
            image_url,
            stock_quantity,
        });

        res.status(201).json(newProduct);

    } catch (error: unknown) {
        console.error('Error Creating Product:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });


    }
});

//update a product's details
export const updateProduct = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updates = req.body;

        const updatedProduct = await productModel.updateProduct(id, updates);

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found or no fields to update" });
            return;
        }

        res.status(200).json(updatedProduct);


    } catch (error: unknown) {
        console.error('Error Updating Product:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
})

//Delete the product

export const deleteProduct = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        await productModel.deleteProduct(id);

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error: unknown) {

        console.error('Error Deleting Product:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
});
