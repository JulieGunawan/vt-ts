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
const Header_1 = __importDefault(require("./Header"));
const styles_1 = require("@mui/material/styles");
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const AllBlogs = () => {
    const defaultTheme = (0, styles_1.createTheme)();
    const [isAtEnd, setIsAtEnd] = (0, react_1.useState)(false);
    const [isAtBeginning, setIsAtBeginning] = (0, react_1.useState)(true);
    const [articles, setArticles] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    const getBlogs = (page) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:5000/blogs?page=${page}&limit=6`);
            const data = yield response.json();
            setArticles(data);
        }
        catch (error) {
            console.log(error.message);
            setArticles([]);
        }
    });
    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };
    const previousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    (0, react_1.useEffect)(() => {
        getBlogs(page);
        setPage(page);
        setIsAtBeginning(page === 1);
        setIsAtEnd(page > 1 && Math.ceil(articles.length / 6) === 0);
    }, [page]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(styles_1.ThemeProvider, { theme: defaultTheme, children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), (0, jsx_runtime_1.jsxs)(Container_1.default, { maxWidth: "lg", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("h1", { children: "All Blogs" }), (0, jsx_runtime_1.jsx)(Grid_1.default, { container: true, spacing: 2, children: articles.map((post) => {
                                return ((0, jsx_runtime_1.jsx)(Grid_1.default, { item: true, xs: 12, md: 6, lg: 4, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "list-item", to: `/${post.slug}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "blog-post", children: [(0, jsx_runtime_1.jsx)("h3", { children: post.title }), (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: {
                                                        __html: post.content.substring(0, 150) + '...',
                                                    } }), (0, jsx_runtime_1.jsxs)("p", { children: ["Published at:", ' ', new Date(post.published_at).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                        })] })] }) }) }, post.id));
                            }) }), (0, jsx_runtime_1.jsxs)(Box_1.default, { display: "flex", justifyContent: "space-between", children: [!isAtBeginning && ((0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", className: "previous", onClick: previousPage, children: "PREV" })), !isAtEnd && ((0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", className: "next", onClick: nextPage, children: "NEXT" }))] })] })] }) }));
};
exports.default = AllBlogs;
