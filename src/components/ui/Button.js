import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const Button = ({ variant = 'primary', size = 'md', isLoading = false, className = '', children, ...props }) => {
    const baseClass = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500',
        text: 'bg-transparent text-blue-600 hover:bg-gray-50 hover:text-blue-700 focus-visible:ring-blue-500'
    };
    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3 text-lg'
    };
    const variantClass = variants[variant];
    const sizeClass = sizes[size];
    return (_jsx("button", { className: `${baseClass} ${variantClass} ${sizeClass} ${className}`, disabled: isLoading || props.disabled, ...props, children: isLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "mr-2 h-4 w-4 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Loading..."] })) : (children) }));
};
export default Button;
