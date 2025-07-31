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
exports.verifyToken = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const supabase_1 = require("../lib/supabase");
const router = express_1.default.Router();
// Validation schemas
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2)
});
// Login endpoint
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const { data: { user }, error } = yield supabase_1.supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            return res.status(401).json({ error: error.message });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.json({ token, user });
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid input' });
    }
}));
// Register endpoint
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = registerSchema.parse(req.body);
        const { data: { user }, error } = yield supabase_1.supabase.auth.signUp({
            email,
            password
        });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        // Create user profile in our database
        yield supabase_1.supabase.from('users').insert({
            id: user === null || user === void 0 ? void 0 : user.id,
            email: user === null || user === void 0 ? void 0 : user.email,
            name
        });
        const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.json({ token, user });
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid input' });
    }
}));
// Verify token middleware
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
exports.default = router;
