import express from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { verifyToken } from './auth';

const router = express.Router();

// Validation schemas
const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  store_id: z.string().uuid(),
  image_url: z.string().url().optional()
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        store:stores(name, address)
      `)
      .order('name');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products by store
router.get('/store/:storeId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', req.params.storeId)
      .order('name');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products with storeId query parameter (for compatibility)
router.get('/', async (req, res) => {
  try {
    const { storeId } = req.query;
    
    let query = supabase
      .from('products')
      .select('*')
      .order('name');

    if (storeId) {
      query = query.eq('store_id', storeId);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        store:stores(name, address)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new product (requires authentication)
router.post('/', verifyToken, async (req, res) => {
  try {
    const productData = productSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Update product (requires authentication)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const productData = productSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Delete product (requires authentication)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 