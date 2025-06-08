import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Card = ({ title, className = '', children, noPadding = false, onClick }) => {
    return (_jsxs("div", { className: `bg-white rounded-lg shadow-md overflow-hidden ${className}`, onClick: onClick, children: [title && (_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsx("h3", { className: "text-lg font-medium text-gray-900", children: title }) })), _jsx("div", { className: noPadding ? '' : 'p-6', children: children })] }));
};
export default Card;
