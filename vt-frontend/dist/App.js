"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
// import Post from './components/Post';
const HomePage_1 = __importDefault(require("./components/HomePage"));
const AllBlogs_1 = __importDefault(require("./components/AllBlogs"));
const AddBlogPage_1 = __importDefault(require("./components/AddBlogPage"));
// import DeleteBlogPage from './components/DeleteBlogPage';
const styles_1 = require("@mui/material/styles");
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const Container_1 = __importDefault(require("@mui/material/Container"));
function App() {
    const defaultTheme = (0, styles_1.createTheme)();
    return ((0, jsx_runtime_1.jsxs)(styles_1.ThemeProvider, { theme: defaultTheme, children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), (0, jsx_runtime_1.jsx)(Container_1.default, { maxWidth: "lg", children: (0, jsx_runtime_1.jsx)("div", { className: "App", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(HomePage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/all-blogs", element: (0, jsx_runtime_1.jsx)(AllBlogs_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/create", element: (0, jsx_runtime_1.jsx)(AddBlogPage_1.default, {}) })] }) }) })] }));
}
exports.default = App;
