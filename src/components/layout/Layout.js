import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Brain, FileText, Home, LogOut, Shield, User } from 'lucide-react';
import Button from '../ui/Button';
const Layout = ({ children }) => {
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        }
        catch (error) {
            console.error('Logout failed', error);
        }
    };
    const NavItem = ({ to, text, icon }) => {
        const isActive = location.pathname === to;
        return (_jsxs(Link, { to: to, className: `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                    ${isActive
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-700 hover:bg-gray-100'}`, children: [icon, _jsx("span", { children: text })] }));
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col", children: [_jsx("header", { className: "bg-white shadow-sm sticky top-0 z-10", children: _jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx(Brain, { className: "h-8 w-8 text-blue-600" })] }), _jsx("div", { className: "flex items-center space-x-4", children: currentUser ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/profile", className: "text-sm text-gray-600 hover:text-gray-900", children: currentUser.email }), _jsxs(Button, { variant: "text", size: "sm", onClick: handleLogout, className: "flex items-center space-x-1", children: [_jsx(LogOut, { className: "h-4 w-4" }), _jsx("span", { children: "Logout" })] })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", children: _jsx(Button, { variant: "outline", size: "sm", children: "Login" }) }), _jsx(Link, { to: "/signup", children: _jsx(Button, { size: "sm", children: "Sign Up" }) })] })) })] }) }), _jsxs("div", { className: "flex-1 flex overflow-hidden", children: [currentUser && (_jsx("aside", { className: "w-64 bg-white border-r border-gray-200 p-4 hidden md:block overflow-y-auto", children: _jsxs("nav", { className: "flex flex-col space-y-2", children: [_jsx(NavItem, { to: "/home", text: "Home", icon: _jsx(Home, { className: "h-5 w-5" }) }), _jsx(NavItem, { to: "/profile", text: "Profile", icon: _jsx(User, { className: "h-5 w-5" }) }), _jsx(NavItem, { to: "/adhd", text: "ADHD Screening", icon: _jsx(Brain, { className: "h-5 w-5" }) }), _jsx(NavItem, { to: "/dyslexia", text: "Dyslexia Screening", icon: _jsx(FileText, { className: "h-5 w-5" }) }), currentUser.email === 'admin@example.com' && (_jsx(NavItem, { to: "/admin", text: "Admin Dashboard", icon: _jsx(Shield, { className: "h-5 w-5" }) }))] }) })), _jsx("main", { className: "flex-1 overflow-y-auto bg-gray-50", children: _jsx("div", { className: "container mx-auto px-4 py-6", children: children }) })] }), _jsx("footer", { className: "bg-white border-t border-gray-200 py-4", children: _jsxs("div", { className: "container mx-auto px-4 text-center text-sm text-gray-600", children: [_jsx("p", { children: "\u00A9 All rights reserved." }), _jsx("p", { className: "mt-1", children: "This tool is not a substitute for professional medical advice, diagnosis, or treatment." })] }) })] }));
};
export default Layout;
