// routes/cartRoutes.ts
import express from 'express';
import * as cartController from '@app/controllers/cartController';

const cart = express.Router();

cart.get('/', cartController.getCartItems);
cart.post('/', cartController.addToCart);
cart.put('/', cartController.updateCartItem);
cart.delete('/:productId', cartController.removeCartItem);
cart.delete('/', cartController.clearCart);

export default cart;
