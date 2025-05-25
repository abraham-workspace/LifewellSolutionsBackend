import { Request, Response } from "express";
import asyncHandler from "@app/middleware/asyncHandler/asyncHandler";
import { UserRequest } from "@app/utils/types/userTypes";
import * as CartModel from "@app/models/cartModel"

// Get all cart items for current user
export const getCartItems = asyncHandler(async (req: UserRequest, res: Response) => {

    try {
        const userId = req.user!.id;
        const cartItems = await CartModel.getCartItemsByUserId(userId);
        res.status(200).json(cartItems);

    } catch (error: unknown) {
        console.error('Error Fetching cart items:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
});

// Add item to cart
export const addToCart = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const { product_id, quantity } = req.body;

        if (!product_id || !quantity) {
            res.status(400).json({ message: 'Product ID and quantity are required' });
            return;
        }

        const cartItem = await CartModel.addCartItem(userId, product_id, quantity);
        res.status(201).json({ message: 'Item added to cart', cartItem });

    } catch (error: unknown) {
        console.error('Error adding Item to cart:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
});



// Update cart item quantity
export const updateCartItem = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const { product_id, quantity } = req.body;

        if (!product_id || !quantity) {
            res.status(400).json({ message: 'Product ID and quantity are required' });
            return;
        }

        const updatedItem = await CartModel.updateCartItemQuantity(userId, product_id, quantity);
        if (!updatedItem) {
            res.status(404).json({ message: 'Cart item not found' });
            return;
        }

        res.status(200).json({ message: 'Cart item updated', updatedItem });

    } catch (error: unknown) {
        console.error('Error updating Item in the cart:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove a cart item
export const removeCartItem = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const productId = parseInt(req.params.productId);

        await CartModel.removeCartItem(userId, productId);
        res.status(200).json({ message: 'Cart item removed' });
    } catch (error: unknown) {
        console.error('Error removing Item from the cart:', error instanceof Error ? error.message : error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

// Clear cart
export const clearCart = asyncHandler(async (req: UserRequest, res: Response) => {
    const userId = req.user!.id;
    await CartModel.clearCart(userId);
    res.status(200).json({ message: 'Cart cleared' });
  });
