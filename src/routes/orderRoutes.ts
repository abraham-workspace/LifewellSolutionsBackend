import express from 'express';
import * as orderController from '@app/controllers/orderController';

const order = express.Router();

order.post('/', orderController.createOrder);
order.get('/', orderController.getUserOrders);
order.get('/:orderId', orderController.getOrderDetails);

export default order;
