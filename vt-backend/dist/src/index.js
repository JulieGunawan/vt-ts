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
const models_1 = __importDefault(require("../models"));
const cors_1 = __importDefault(require("cors"));
// import router from '../routes/blogs';
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const PORT = 5000;
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default
        .authenticate()
        .then(() => {
        console.log('Database connected');
    })
        .catch((err) => {
        console.log('Error: ' + err.message);
    });
});
// middleware
const corsOptions = {
    origin: "*",
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Routes for blogs API calls
// app.use('/blogs', router);
app.get('/blogs', (req, res) => {
    models_1.default.Blog.findAll()
        .then((result) => res.json(result)).catch((err) => console.log(err));
});
// db.sequelize.sync()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
app.listen(PORT, () => {
    connectToDB();
    console.log(`server running on port ${PORT}`);
});
