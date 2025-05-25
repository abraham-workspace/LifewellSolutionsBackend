// models/paymentModel.ts
import pool from '@app/db/db';

export interface Payment {
    id: number;
    order_id: number;
    amount: number;
    payment_method: string;
    status: string;
    transaction_id?: string; 
    paid_at?: Date;
  }
  
export const createPayment = async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
  const { order_id, amount, payment_method, status, paid_at } = payment;
  const { rows } = await pool.query(
    `INSERT INTO payment (order_id, amount, payment_method, status, paid_at)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [order_id, amount, payment_method, status, paid_at]
  );
  return rows[0];
};

export const getPaymentById = async (id: number): Promise<Payment | null> => {
  const { rows } = await pool.query('SELECT * FROM payment WHERE id = $1', [id]);
  return rows[0] || null;
};

export const getAllPayments = async (): Promise<Payment[]> => {
  const { rows } = await pool.query('SELECT * FROM payment');
  return rows;
};

export const updatePaymentStatus = async (id: number, status: string): Promise<Payment | null> => {
  const { rows } = await pool.query(
    `UPDATE payment SET status = $1, paid_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return rows[0] || null;
};

export const deletePayment = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM payment WHERE id = $1', [id]);
};
