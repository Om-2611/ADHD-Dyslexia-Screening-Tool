import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { LogIn, Shield } from 'lucide-react';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            // Check if it's an admin login
            if (isAdmin && email !== 'admin@example.com') {
                throw new Error('Invalid admin credentials');
            }
            // Navigate based on user type
            if (email === 'admin@example.com') {
                navigate('/admin');
            }
            else {
                navigate('/home');
            }
        }
        catch (err) {
            setError(isAdmin ? 'Invalid admin credentials' : 'Failed to sign in. Please check your credentials.');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex justify-center", children: _jsx(LogIn, { className: "h-12 w-12 text-blue-600" }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: isAdmin ? 'Admin Login' : 'Sign in to your account' }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Or", ' ', _jsx(Link, { to: "/signup", className: "font-medium text-blue-600 hover:text-blue-500", children: "create a new account" })] })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs(Card, { className: "py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [_jsx("div", { className: "mb-6", children: _jsxs("button", { onClick: () => setIsAdmin(!isAdmin), className: `w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${isAdmin
                                    ? 'bg-purple-50 border-purple-300 text-purple-700'
                                    : 'bg-white border-gray-300 text-gray-700'}`, children: [_jsx(Shield, { className: `w-5 h-5 mr-2 ${isAdmin ? 'text-purple-500' : 'text-gray-400'}` }), isAdmin ? 'Switch to User Login' : 'Login as Admin'] }) }), error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx(Input, { id: "email", type: "email", label: "Email address", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email", placeholder: isAdmin ? 'admin@example.com' : 'Enter your email' }), _jsx(Input, { id: "password", type: "password", label: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "current-password" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-700", children: "Remember me" })] }), !isAdmin && (_jsx("div", { className: "text-sm", children: _jsx(Link, { to: "/reset-password", className: "font-medium text-blue-600 hover:text-blue-500", children: "Forgot your password?" }) }))] }), _jsx(Button, { type: "submit", isLoading: loading, className: "w-full flex justify-center py-2 px-4", children: isAdmin ? 'Sign in as Admin' : 'Sign in' })] })] }) })] }));
};
export default Login;
