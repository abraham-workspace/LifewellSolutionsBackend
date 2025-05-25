import pool from '@app/db/db'

export interface Order{
    id:number;
    user_id: number;
    status: string;
    total_amount: number; 
    created_at:Date;
}

export interface OrderItem{
    id:number;
    order_id: number;
    product_id:number;
    quantity:number;
    price:number; 
}


// Create a new order
export const createOrder = async (user_id: number, total_amount: number, status = 'pending'): Promise<Order> => {
    const { rows } = await pool.query(
      `INSERT INTO orders (user_id, total_amount, status) 
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, total_amount, status]
    );
    return rows[0];
  };
  
  // Add items to an order
  export const addOrderItem = async (order_id: number, product_id: number, quantity: number, price: number): Promise<OrderItem> => {
    const { rows } = await pool.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [order_id, product_id, quantity, price]
    );
    return rows[0];
  };
  
  // Get all orders for a user
  export const getOrdersByUser = async (user_id: number): Promise<Order[]> => {
    const { rows } = await pool.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
    return rows;
  };
  
  // Get a specific order with items
  export const getOrderDetails = async (order_id: number): Promise<{ order: Order, items: OrderItem[] } | null> => {
    const orderQuery = await pool.query('SELECT * FROM orders WHERE id = $1', [order_id]);
    if (orderQuery.rows.length === 0) return null;
  
    const order = orderQuery.rows[0];
    const itemsQuery = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [order_id]);
    return { order, items: itemsQuery.rows };
  };