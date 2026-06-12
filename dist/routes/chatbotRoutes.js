"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatbotController_1 = __importDefault(require("../controllers/chatbotController"));
const router = express_1.default.Router();
router.post('/', chatbotController_1.default.answer);
exports.default = router;
