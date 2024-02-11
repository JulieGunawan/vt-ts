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
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
// import {Blog} from '../models';
// import router from'../routes/blogs';
dotenv_1.default.config();
//test DB
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
//create express app
const app = (0, express_1.default)();
// middleware
const corsOptions = {
    origin: "*",
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Routes for blogs API calls
// app.use('/blogs', router);
// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../vt-frontend/build')));
//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'vt-frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }
// app.get('/blogs', async (req, res) =>{
//   try{
//     const records = await Blog.findAll();
//     return res.json(records);
//   } catch (e){
//     return res.json({msg:'fail to read', status: 500, route: '/blogs'});
//   }
// });
app.post("/create", (req, res) => {
    console.log(req.body);
    return res.send;
});
const PORT = 5000;
app.listen(PORT, () => {
    connectToDB();
    console.log(`server running on port ${PORT}`);
});
// Synchronize models with the database
// database
//   .sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing database:', err);
//   });
