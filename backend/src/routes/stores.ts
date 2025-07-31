import express from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { verifyToken } from './auth';

const router = express.Router();

// Validation schemas
const storeSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180)
});

// Get all stores
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .order('name');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get store by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new store (requires authentication)
router.post('/', verifyToken, async (req, res) => {
  try {
    const storeData = storeSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('stores')
      .insert({
        ...storeData,
        owner_id: req.user?.userId
      })
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

// Update store (requires authentication)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const storeData = storeSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('stores')
      .update(storeData)
      .eq('id', req.params.id)
      .eq('owner_id', req.user?.userId)
      .select()
      .single();

    if (error) {
      return res.status(404).json({ error: 'Store not found or unauthorized' });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Delete store (requires authentication)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { error } = await supabase
      .from('stores')
      .delete()
      .eq('id', req.params.id)
      .eq('owner_id', req.user?.userId);

    if (error) {
      return res.status(404).json({ error: 'Store not found or unauthorized' });
    }

    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 