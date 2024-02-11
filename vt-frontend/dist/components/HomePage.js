"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Header_1 = __importDefault(require("./Header"));
const SearchBar_1 = __importDefault(require("./SearchBar"));
const HomePage = () => {
    const publishedAt = null;
    const deletedAt = null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "homePage", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("h1", { children: "Blogs" }), (0, jsx_runtime_1.jsx)(SearchBar_1.default, { id: 0, slug: "", title: "", content: "", published_at: publishedAt, deleted_at: deletedAt })] }));
};
exports.default = HomePage;
