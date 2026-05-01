"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
const connectToDatabase = async () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI environment variable is missing.');
    }
    console.log('=> using new database connection');
    await mongoose_1.default.connect(uri);
    isConnected = true;
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map