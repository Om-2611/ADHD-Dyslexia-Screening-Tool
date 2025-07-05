import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { UserPlus } from 'lucide-react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const getErrorMessage = (error: any): string => {
    if (error?.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'This email address is already registered. Please try logging in instead.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/weak-password':
          return 'Password is too weak. Please choose a stronger password.';
        case 'auth/operation-not-allowed':
          return 'Email/password accounts are not enabled. Please contact support.';
        case 'auth/network-request-failed':
          return 'Network error. Please check your internet connection and try again.';
        case 'auth/too-many-requests':
          return 'Too many failed attempts. Please try again later.';
        default:
          return `Account creation failed: ${error.message || 'Unknown error occurred.'}`;
      }
    }
    return 'Failed to create an account. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      console.log('Attempting to create account for:', email);
      await signup(email, password);
      console.log('Account created successfully');
      navigate('/');
    } catch (err: any) {
      console.error('Detailed signup error:', {
        error: err,
        code: err?.code,
        message: err?.message,
        email: email
      });
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="mt-8">
        <div className="flex justify-center mb-6">
          <UserPlus className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Create an account</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          
          <Input
            id="confirm-password"
            type="password"
            label="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          
          <Button
            type="submit"
            isLoading={loading}
            className="w-full"
          >
            Sign up
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;