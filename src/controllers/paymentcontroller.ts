import { Request, Response } from 'express';
import asyncHandler from '@app/middleware/asyncHandler/asyncHandler';
import * as PaymentModel from '@app/models/paymentModel';
import stripe from '@app/utils/helpers/stripe.config'; 

// Existing CRUD Functions (keep as is)
export const getAllPayments = asyncHandler(async (_req: Request, res: Response) => {
  const payments = await PaymentModel.getAllPayments();
  res.status(200).json(payments);
});

export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const payment = await PaymentModel.getPaymentById(id);

  if (!payment) {
    res.status(404).json({ message: 'Payment not found' });
    return;
  }

  res.status(200).json(payment);
});

export const updatePaymentStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const payment = await PaymentModel.updatePaymentStatus(id, status);

  if (!payment) {
    res.status(404).json({ message: 'Payment not found' });
    return;
  }

  res.status(200).json({
    message: 'Payment status updated',
    payment,
  });
});

export const deletePayment = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await PaymentModel.deletePayment(id);
  res.status(200).json({ message: 'Payment deleted' });
});

// ✅ Stripe Integration

// 1️⃣ Create Payment Intent
export const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
  const { order_id, amount, currency = 'usd' } = req.body;

  if (!order_id || !amount) {
    res.status(400).json({ message: 'Order ID and amount are required' });
    return;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe expects cents
    currency,
    metadata: { order_id: order_id.toString() },
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    message: 'Payment intent created',
  });
});

// 2️⃣ Confirm Payment and Save to DB
export const confirmPayment = asyncHandler(async (req: Request, res: Response) => {
  const { paymentIntentId, order_id } = req.body;

  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (intent.status === 'succeeded') {
    const payment = await PaymentModel.createPayment({
      order_id: parseInt(order_id),
      amount: intent.amount / 100,
      payment_method: intent.payment_method_types[0],
      status: intent.status,
      transaction_id: intent.id,
      paid_at: new Date(intent.created * 1000),
    });

    await PaymentModel.updatePaymentStatus(parseInt(order_id), 'paid');

    res.status(200).json({
      message: 'Payment confirmed and saved to DB',
      payment,
    });
  } else {
    res.status(400).json({ message: 'Payment not successful', status: intent.status });
  }
});
