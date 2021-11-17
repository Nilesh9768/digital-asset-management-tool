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
const image_1 = __importDefault(require("../models/image"));
const router = express_1.default.Router();
router.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('get images');
    try {
        const foundImages = yield image_1.default.find({});
        console.log(foundImages);
        if (!foundImages) {
            return res.status(422).json({ error: "Something went wrong!" });
        }
        return res.json(foundImages);
    }
    catch (error) {
        console.log(error);
    }
}));
router.post('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, metadata, presetName } = req.body;
        const newImage = new image_1.default({
            url,
            metadata: {
                size: metadata.size,
                format: metadata.format
            },
            preset_name: presetName
        });
        const savedImage = yield newImage.save();
        if (!savedImage) {
            return res.status(422).json({ error: 'Something went wrong!' });
        }
        console.log(savedImage);
        return res.json({
            message: 'Uploaded Successfully',
            savedImage
        });
    }
    catch (err) {
        console.log('Got this error =>', err);
    }
}));
exports.default = router;
