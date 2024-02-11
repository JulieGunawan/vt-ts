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
const react_router_dom_1 = require("react-router-dom");
const Dialog_1 = __importDefault(require("./Dialog"));
const Header_1 = __importDefault(require("./Header"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const DeleteBlogPage = () => {
    const [article, setArticle] = (0, react_1.useState)(null);
    const { slug } = (0, react_router_dom_1.useParams)();
    const [dialog, setDialog] = (0, react_1.useState)({
        message: '',
        isLoading: false,
    });
    const [empty, setEmpty] = (0, react_1.useState)(false);
    const renderBlog = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(slug);
            const response = yield fetch(`http://localhost:5000/blogs/getBySlug/${slug}`);
            const data = yield response.json();
            setArticle(data);
        }
        catch (error) {
            console.log(error.message);
        }
    });
    const removeBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:5000/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deleted_at: new Date() }),
            });
            if (response.ok) {
                alert('Blog is succesfully deleted');
                setArticle(null);
            }
            else {
                console.error('Failed to delete blog');
            }
        }
        catch (error) {
            console.log(error.message);
        }
    });
    (0, react_1.useEffect)(() => {
        renderBlog();
    }, [dialog]);
    const handleDialog = (message, isLoading) => {
        setDialog({ message, isLoading });
    };
    const handleDelete = () => {
        handleDialog('Are you sure you want to delete this post?', true);
        setEmpty(true);
    };
    const areYouSureDelete = (selected) => {
        if (selected) {
            handleDialog('', false);
            const blogId = selected.id;
            removeBlog(blogId);
        }
        else {
            handleDialog('', false);
        }
    };
    if (!article) {
        console.log('article not found');
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("p", { children: "Post not found" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "deletePost", children: [(0, jsx_runtime_1.jsx)("h1", { children: article.title }), (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: article.content } }), (0, jsx_runtime_1.jsxs)("p", { children: ["Published at:", ' ', new Date(article.published_at).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })] }), (0, jsx_runtime_1.jsxs)(Box_1.default, { display: "flex", justifyContent: "space-between", children: [empty ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", children: "Back" }) })) : ((0, jsx_runtime_1.jsx)(Button_1.default, { onClick: handleDelete, variant: "contained", color: "error", children: "Delete" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", children: "Cancel" }) })] })] }), dialog.isLoading && ((0, jsx_runtime_1.jsx)(Dialog_1.default, { message: dialog.message, onConfirm: areYouSureDelete }))] }));
};
exports.default = DeleteBlogPage;
