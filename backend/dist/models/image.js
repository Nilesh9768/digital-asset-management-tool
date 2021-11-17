"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    url: String,
    metadata: {
        size: Number,
        format: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    },
    preset_name: String
});
exports.default = (0, mongoose_1.model)('image', imageSchema);
