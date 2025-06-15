import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import { BrainCircuit, BookOpen, Users } from 'lucide-react';
import QuestionManager from '../../components/admin/QuestionManager';
import UserManager from '../../components/admin/UserManager';
const AdminDashboard = () => {
    const { currentUser, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('users');
    const [error, setError] = useState(null);
    // Show loading state while checking authentication
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" }) }));
    }
    // Check if user is admin
    if (!currentUser || currentUser.email !== 'admin@example.com') {
        return _jsx(Navigate, { to: "/" });
    }
    const handleTabChange = (tab) => {
        setError(null);
        setActiveTab(tab);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200", children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsx("div", { className: "flex items-center justify-center h-16 px-4 border-b border-gray-200", children: _jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Admin Panel" }) }), _jsxs("nav", { className: "flex-1 px-2 py-4 space-y-1", children: [_jsxs("button", { onClick: () => handleTabChange('users'), className: `w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'users'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`, children: [_jsx(Users, { className: "mr-3 h-5 w-5" }), "User Management"] }), _jsxs("button", { onClick: () => handleTabChange('adhd'), className: `w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'adhd'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`, children: [_jsx(BrainCircuit, { className: "mr-3 h-5 w-5" }), "ADHD Questions"] }), _jsxs("button", { onClick: () => handleTabChange('dyslexia'), className: `w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'dyslexia'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`, children: [_jsx(BookOpen, { className: "mr-3 h-5 w-5" }), "Dyslexia Questions"] })] })] }) }), _jsx("div", { className: "pl-64", children: _jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [error && (_jsx("div", { className: "mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md", children: error })), _jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: activeTab === 'users'
                                        ? 'User Management'
                                        : activeTab === 'adhd'
                                            ? 'ADHD Screening Questions'
                                            : 'Dyslexia Screening Questions' }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: activeTab === 'users'
                                        ? 'View and manage user information and test history'
                                        : `Manage screening questions for ${activeTab === 'adhd' ? 'ADHD' : 'Dyslexia'} assessment` })] }), _jsx("div", { className: "relative", children: activeTab === 'users' ? (_jsx(UserManager, {})) : (_jsx(ErrorBoundary, { onError: (error) => setError(error.message), children: _jsx(QuestionManager, { category: activeTab }, activeTab) })) })] }) })] }));
};
// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error) {
        this.props.onError(error);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-red-600", children: "Something went wrong. Please try again." }) }));
        }
        return this.props.children;
    }
}
export default AdminDashboard;
