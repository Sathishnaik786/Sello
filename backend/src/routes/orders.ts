import express from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { verifyToken } from './auth';

const router = express.Router();

// Validation schemas
const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().positive(),
  price: z.number().positive()
});

const orderSchema = z.object({
  store_id: z.string().uuid(),
  items: z.array(orderItemSchema),
  total: z.number().positive()
});

// Get all orders (for admin/store owners)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        store:stores(name),
        user:users(email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        store:stores(name, address),
        order_items(
          quantity,
          price,
          product:products(name)
        )
      `)
      .eq('user_id', req.user?.userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const orderData = orderSchema.parse(req.body);
    
    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: req.user?.userId,
        store_id: orderData.store_id,
        total: orderData.total,
        status: 'PENDING'
      })
      .select()
      .single();

    if (orderError) {
      return res.status(400).json({ error: orderError.message });
    }

    // Insert order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      return res.status(400).json({ error: itemsError.message });
    }

    // Emit real-time update to store
    req.app.get('io').to(`store-${orderData.store_id}`).emit('new-order', {
      orderId: order.id,
      total: orderData.total,
      items: orderData.items.length
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Update order status
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['PENDING', 'PREPARING', 'READY', 'PICKED_UP', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Emit real-time update
    req.app.get('io').to(`store-${data.store_id}`).emit('order-updated', {
      orderId: data.id,
      status: data.status
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        store:stores(name, address),
        order_items(
          quantity,
          price,
          product:products(name)
        )
      `)
      .eq('id', req.params.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 