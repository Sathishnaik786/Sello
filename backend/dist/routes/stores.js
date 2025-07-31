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
const storeSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    address: zod_1.z.string().min(5),
    lat: zod_1.z.number().min(-90).max(90),
    lng: zod_1.z.number().min(-180).max(180)
});
// Get all stores
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase
            .from('stores')
            .select('*')
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
// Get store by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase_1.supabase
            .from('stores')
            .select('*')
            .eq('id', req.params.id)
            .single();
        if (error) {
            return res.status(404).json({ error: 'Store not found' });
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Create new store (requires authentication)
router.post('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const storeData = storeSchema.parse(req.body);
        const { data, error } = yield supabase_1.supabase
            .from('stores')
            .insert(Object.assign(Object.assign({}, storeData), { owner_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }))
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
// Update store (requires authentication)
router.put('/:id', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const storeData = storeSchema.parse(req.body);
        const { data, error } = yield supabase_1.supabase
            .from('stores')
            .update(storeData)
            .eq('id', req.params.id)
            .eq('owner_id', (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)
            .select()
            .single();
        if (error) {
            return res.status(404).json({ error: 'Store not found or unauthorized' });
        }
        res.json(data);
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid input' });
    }
}));
// Delete store (requires authentication)
router.delete('/:id', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { error } = yield supabase_1.supabase
            .from('stores')
            .delete()
            .eq('id', req.params.id)
            .eq('owner_id', (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
        if (error) {
            return res.status(404).json({ error: 'Store not found or unauthorized' });
        }
        res.json({ message: 'Store deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
