import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Layout from './components/layout/Layout';
// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ADHDTests from './pages/tests/ADHDTests';
import DyslexiaTests from './pages/tests/DyslexiaTests';
import TestEngine from './pages/tests/TestEngine';
import TestResults from './pages/tests/TestResults';
import UserProfile from './pages/profile/UserProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
// Protected route component
const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" }) }));
    }
    return currentUser ? _jsx(Layout, { children: children }) : _jsx(Navigate, { to: "/login" });
};
function App() {
    const { currentUser } = useAuth();
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/home", element: _jsx(ProtectedRoute, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: "/adhd", element: _jsx(ProtectedRoute, { children: _jsx(ADHDTests, {}) }) }), _jsx(Route, { path: "/dyslexia", element: _jsx(ProtectedRoute, { children: _jsx(DyslexiaTests, {}) }) }), _jsx(Route, { path: "/test/adhd/:testId", element: _jsx(ProtectedRoute, { children: _jsx(TestEngine, {}) }) }), _jsx(Route, { path: "/test/dyslexia/:testId", element: _jsx(Layout, { children: _jsx(TestEngine, {}) }) }), _jsx(Route, { path: "/results/:testType/:testId", element: _jsx(Layout, { children: _jsx(TestResults, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(UserProfile, {}) }) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/", element: currentUser ? _jsx(Navigate, { to: "/home" }) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }) }));
}
export default App;
