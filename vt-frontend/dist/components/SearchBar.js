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
const fa_1 = require("react-icons/fa");
const react_router_dom_1 = require("react-router-dom");
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const SearchBar = () => {
    const [input, setInput] = (0, react_1.useState)('');
    const [articles, setArticles] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    const [isAtEnd, setIsAtEnd] = (0, react_1.useState)(true);
    const [isAtBeginning, setIsAtBeginning] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const handleChange = (event) => {
        setInput(event.target.value);
        setPage(1);
    };
    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };
    const previousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    (0, react_1.useEffect)(() => {
        const renderBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!input) {
                    setArticles([]);
                    setIsAtEnd(true);
                    setIsAtBeginning(true);
                }
                else {
                    const response = yield fetch(`http://localhost:5000/blogs?page=${page}&limit=6`);
                    const data = yield response.json();
                    const newData = data.filter((post) => post.title.toLowerCase().includes(input.toLowerCase()) &&
                        post.deleted_at == null &&
                        post.published_at != null);
                    setArticles(newData);
                    setIsAtEnd(newData.length < 6); // Check if there are less than 6 items on the current page
                    setIsAtBeginning(page === 1);
                }
            }
            catch (err) {
                setError(err.message);
                console.log(error);
            }
        });
        renderBlogs();
    }, [input, page]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "searchBar", children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)(fa_1.FaSearch, { className: "searchIcon" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search...", value: input, onChange: handleChange })] }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "searchPage", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Search Results:" }), (0, jsx_runtime_1.jsx)(Grid_1.default, { container: true, spacing: 2, children: articles.map((post) => ((0, jsx_runtime_1.jsx)(Grid_1.default, { item: true, xs: 12, sm: 6, md: 4, lg: 4, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: "list-result", to: `/${post.slug}`, children: [(0, jsx_runtime_1.jsx)("h3", { children: post.title }), (0, jsx_runtime_1.jsx)("div", { className: "searchContent", dangerouslySetInnerHTML: {
                                                __html: post.content.substring(0, 150) + '...',
                                            } }), (0, jsx_runtime_1.jsxs)("div", { children: ["Published at:", ' ', new Date(post.published_at).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                })] })] }) }, post.id))) }), (0, jsx_runtime_1.jsxs)(Box_1.default, { display: "flex", justifyContent: "space-between", children: [!isAtBeginning && ((0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", onClick: previousPage, children: "PREV" })), !isAtEnd && ((0, jsx_runtime_1.jsx)(Button_1.default, { variant: "contained", onClick: nextPage, children: "NEXT" }))] })] }) })] }));
};
exports.default = SearchBar;
