import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Brain, FileText, Home, LogOut, Shield, User, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const NavItem: React.FC<{ to: string; text: string; icon: React.ReactNode }> = ({ to, text, icon }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'text-gray-700 hover:bg-gray-100'}`}
      >
        {icon}
        <span>{text}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">SCREENING TOOL FOR ADHD AND DYSLEXIA</span>
              <span className="text-xl font-bold text-gray-900 sm:hidden">SCREENING TOOL</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">
                  {currentUser.email}
                </Link>
                <Button
                  variant="text"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        {currentUser && (
          <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 transform transition-transform duration-200 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } z-30 md:relative md:translate-x-0`}>
            <nav className="flex flex-col space-y-2">
              <NavItem to="/home" text="Home" icon={<Home className="h-5 w-5" />} />
              <NavItem to="/profile" text="Profile" icon={<User className="h-5 w-5" />} />
              <NavItem to="/adhd" text="ADHD Screening" icon={<Brain className="h-5 w-5" />} />
              <NavItem to="/dyslexia" text="Dyslexia Screening" icon={<FileText className="h-5 w-5" />} />
              {currentUser.email === 'admin@example.com' && (
                <NavItem to="/admin" text="Admin Dashboard" icon={<Shield className="h-5 w-5" />} />
              )}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 MindScreen. All rights reserved.</p>
          <p className="mt-1">This tool is not a substitute for professional medical advice, diagnosis, or treatment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;