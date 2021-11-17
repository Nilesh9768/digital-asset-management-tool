"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const image_1 = __importDefault(require("./routers/image"));
dotenv_1.default.config();
try {
    (0, mongoose_1.connect)(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('db connected');
    });
}
catch (e) {
    console.log(e);
}
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(image_1.default);
app.listen(process.env.port || 5000, () => {
    console.log('server listening on 5000');
});
