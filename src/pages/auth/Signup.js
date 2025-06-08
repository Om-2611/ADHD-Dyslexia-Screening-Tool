import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { UserPlus } from 'lucide-react';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }
        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/');
        }
        catch (err) {
            setError('Failed to create an account. Email may already be in use.');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Card, { className: "mt-8", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx(UserPlus, { className: "h-12 w-12 text-blue-600" }) }), _jsx("h2", { className: "text-2xl font-bold text-center text-gray-900 mb-6", children: "Create an account" }), error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(Input, { id: "email", type: "email", label: "Email address", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email" }), _jsx(Input, { id: "password", type: "password", label: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "new-password" }), _jsx(Input, { id: "confirm-password", type: "password", label: "Confirm password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, autoComplete: "new-password" }), _jsx(Button, { type: "submit", isLoading: loading, className: "w-full", children: "Sign up" })] }), _jsxs("div", { className: "mt-6 text-center text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Already have an account?" }), ' ', _jsx(Link, { to: "/login", className: "text-blue-600 hover:text-blue-500 font-medium", children: "Log in" })] })] }) }));
};
export default Signup;
