"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const supabase_1 = require("../lib/supabase");
const auth_1 = require("./auth");
const router = express_1.default.Router();
// Validation schemas
const orderItemSchema = zod_1.z.object({
    product_id: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().positive(),
    price: zod_1.z.number().positive()
});
const orderSchema = zod_1.z.object({
    store_id: zod_1.z.string().uuid(),
    items: zod_1.z.array(orderItemSchema),
    total: zod_1.z.number().positive()
});
// Get all orders (for admin/store owners)
router.get('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase
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
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get user's orders
router.get('/my-orders', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data, error } = yield supabase_1.supabase
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
            .eq('user_id', (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)
            .order('created_at', { ascending: false });
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Create new order
router.post('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderData = orderSchema.parse(req.body);
        // Start a transaction
        const { data: order, error: orderError } = yield supabase_1.supabase
            .from('orders')
            .insert({
            user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
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
        const { error: itemsError } = yield supabase_1.supabase
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
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid input' });
    }
}));
// Update order status
router.patch('/:id/status', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        if (!['PENDING', 'PREPARING', 'READY', 'PICKED_UP', 'CANCELLED'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const { data, error } = yield supabase_1.supabase
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
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get order by ID
router.get('/:id', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase
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
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
