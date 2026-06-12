"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const spotRoutes_1 = __importDefault(require("./spotRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const chatbotRoutes_1 = __importDefault(require("./chatbotRoutes"));
const router = express_1.default.Router();
router.use(authRoutes_1.default);
router.use(spotRoutes_1.default);
router.use(adminRoutes_1.default);
router.use('/chatbot', chatbotRoutes_1.default);
exports.default = router;
