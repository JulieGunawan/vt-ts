"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const theme = (0, styles_1.createTheme)({
    palette: {
        mode: 'light',
        primary: {
            main: 'rgba(255,255,255,0.1)',
        },
    },
});
const Header = () => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(styles_1.ThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(AppBar_1.default, { position: "static", children: (0, jsx_runtime_1.jsx)(Container_1.default, { maxWidth: "xl", children: (0, jsx_runtime_1.jsxs)(Toolbar_1.default, { disableGutters: true, children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: (0, jsx_runtime_1.jsx)("img", { src: "https://assets-global.website-files.com/656f567f632de4526257bc88/658780f2e0c14e285bc49220_Horizontal%20Logo.svg", alt: "vivid-theory-logo" }) }), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: { mx: 'auto' }, children: (0, jsx_runtime_1.jsxs)("ul", { className: "navigation", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/all-blogs", children: "All Blogs" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/create", children: "Add Blog" }) })] }) })] }) }) }) }) }));
exports.default = Header;
