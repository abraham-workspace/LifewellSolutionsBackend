// controllers/orderController.ts
import { Response } from 'express';
import { UserRequest } from '@app/utils/types/userTypes';
import * as OrderModel from '@app/models/orderModel';
import asyncHandler from '@app/middleware/asyncHandler/asyncHandler';
import pool from '@app/db/db'; // In case we need transactions

// Place a new order (assumes frontend sends product list + total)
export const createOrder = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const { items, total_amount } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            res.status(400).json({ message: 'Order items are required' });
            return
        }

        // Start transaction
        await pool.query('BEGIN');

        const newOrder = await OrderModel.createOrder(userId, total_amount);

        for (const item of items) {
            const { product_id, quantity, price } = item;
            await OrderModel.addOrderItem(newOrder.id, product_id, quantity, price);
        }

        await pool.query('COMMIT');

        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to place order' });
    }
});

// Get all orders for current user
export const getUserOrders = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const orders = await OrderModel.getOrdersByUser(userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});

// Get order details by orderId
export const getOrderDetails = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const orderDetails = await OrderModel.getOrderDetails(orderId);

        if (!orderDetails) {
            res.status(404).json({ message: 'Order not found' });

            return
        }

        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Failed to fetch order details' });
    }
});