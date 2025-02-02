import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

interface RegisterFormProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await register(email, password, name);
      if (success) {
        onClose();
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-[600px] flex overflow-hidden">
        {/* Left side - Illustration */}
        <div className="w-1/2 bg-[#F3F0FF] p-12 flex flex-col justify-center relative">
          <button 
            onClick={onClose}
            className="absolute top-8 left-8 text-left hover:opacity-80 transition-opacity"
          >
            <h2 className="text-xl font-bold">Website Name</h2>
          </button>
          <div className="flex-1 flex items-center justify-center">
            <img 
              src="/src/pic/SignUp.png" 
              alt="Register illustration" 
              className="max-w-full h-auto"
            />
          </div>
          <h2 className="text-2xl font-bold">Find everything you need, delivered to your doorstep!</h2>
        </div>

        {/* Right side - Register Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-2xl font-bold mb-2">Welcome to Name...!</h1>
            <p className="text-gray-600 mb-8">Register your account</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="8+ characters"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Create account with</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                >
                  <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google" className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                >
                  <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" className="w-5 h-5" />
                </button>
              </div>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;