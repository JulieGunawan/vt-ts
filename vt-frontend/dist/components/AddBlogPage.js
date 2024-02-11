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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Header_1 = __importDefault(require("./Header"));
const react_router_dom_1 = require("react-router-dom");
const Button_1 = __importDefault(require("@mui/material/Button"));
const Stack_1 = __importDefault(require("@mui/material/Stack"));
// Interface for the blog object
//functionality to add a Blog
const AddBlogPage = () => {
    const [title, setTitle] = (0, react_1.useState)('');
    const [content, setContent] = (0, react_1.useState)('');
    const [slug, setSlug] = (0, react_1.useState)('');
    const [image, setImage] = (0, react_1.useState)('');
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const published_at = new Date();
            const blog = { title, content, slug, image, published_at };
            console.log(blog);
            const response = yield fetch('http://localhost:5000/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blog),
            });
            console.log(response);
            if (response.ok) {
                alert('Your blog has been added');
                setTitle('');
                setSlug('');
                setContent('');
                setImage('');
            }
            else {
                alert('You might enter a duplicate slug');
            }
        }
        catch (error) {
            console.log(error.message);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "addBlog", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("h2", { children: "Add My New Blog" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)(Stack_1.default, { component: "form", sx: {
                            width: '80%',
                            marginBottom: '50px'
                        }, spacing: 2, noValidate: true, autoComplete: "off", children: [(0, jsx_runtime_1.jsx)("label", { children: "Title:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value) }), (0, jsx_runtime_1.jsx)("label", { children: "Content:" }), (0, jsx_runtime_1.jsx)("textarea", { cols: 100, rows: 10, value: content, onChange: (e) => setContent(e.target.value) }), (0, jsx_runtime_1.jsx)("label", { children: "Slug (for SEO):" }), (0, jsx_runtime_1.jsx)("textarea", { value: slug, onChange: (e) => setSlug(e.target.value) }), (0, jsx_runtime_1.jsx)("label", { children: "Image URL:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", size: 40, value: image, onChange: (e) => setImage(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'buttons', children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", type: "button", children: "Cancel " }) }), (0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", color: "success", type: "submit", children: "Submit" })] })] })] }));
};
exports.default = AddBlogPage;
