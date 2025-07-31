import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

const router = express.Router();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    const token = jwt.sign(
      { userId: user?.id, email: user?.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create user profile in our database
    await supabase.from('users').insert({
      id: user?.id,
      email: user?.email,
      name
    });

    const token = jwt.sign(
      { userId: user?.id, email: user?.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Verify token middleware
export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default router; 