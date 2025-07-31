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
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    price: zod_1.z.number().positive(),
    stock: zod_1.z.number().int().min(0),
    store_id: zod_1.z.string().uuid()
});
// Get all products
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase
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
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get products by store
router.get('/store/:storeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase
            .from('products')
            .select('*')
            .eq('store_id', req.params.storeId)
            .order('name');
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get product by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase
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
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Create new product (requires authentication)
router.post('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = productSchema.parse(req.body);
        const { data, error } = yield supabase_1.supabase
            .from('products')
            .insert(productData)
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json(data);
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid input' });
    }
}));
// Update product (requires authentication)
router.put('/:id', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = productSchema.parse(req.body);
        const { data, error } = yield supabase_1.supabase
            .from('products')
            .update(productData)
            .eq('id', req.params.id)
            .select()
            .single();
        if (error) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(data);
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid input' });
    }
}));
// Delete product (requires authentication)
router.delete('/:id', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield supabase_1.supabase
            .from('products')
            .delete()
            .eq('id', req.params.id);
        if (error) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
