import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Input = ({ label, error, className = '', ...props }) => {
    return (_jsxs("div", { className: "flex flex-col w-full space-y-1", children: [label && (_jsx("label", { htmlFor: props.id, className: "text-sm font-medium text-gray-700", children: label })), _jsx("input", { className: `px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                  ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
                  ${className}`, ...props }), error && (_jsx("p", { className: "text-sm text-red-600", children: error }))] }));
};
export default Input;
