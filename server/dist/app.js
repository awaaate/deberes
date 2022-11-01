"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// initialize Body Parser middlewear
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Import routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/task', require('./routes/api/task'));
app.use('/api/tag', require('./routes/api/tag'));
const PORT = process.env.PORT || '3000';
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
