import express from 'express';
import { getAllPayments, getPaymentById, updatePaymentStatus, deletePayment, createPaymentIntent, confirmPayment } from '@app/controllers/paymentcontroller';

const router = express.Router();

// Existing CRUD
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.patch('/:id', updatePaymentStatus);
router.delete('/:id', deletePayment);

// Stripe Flow
router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);

export default router;
