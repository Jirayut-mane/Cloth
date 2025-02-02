import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Implement password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      setIsSuccess(true);
    } catch (error) {
      setError('Failed to send reset instructions');
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
              src="https://cdn.discordapp.com/attachments/1334441583000682496/1334441989571084308/SignUp.png?ex=679d3433&is=679be2b3&hm=ea4388471193a47035076c6dbc70f61e8dacbaed846d00472cf846eb08540c4c&" 
              alt="Forgot password illustration" 
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Right side - Forgot Password Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-2xl font-bold mb-2">Forgot password?</h1>
            <p className="text-gray-600 mb-8">No worries, we'll send you reset instructions.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {isSuccess ? (
              <div className="text-center">
                <div className="mb-4 text-green-600">
                  Reset instructions have been sent to your email.
                </div>
                <button
                  onClick={onBackToLogin}
                  className="text-purple-600 hover:text-purple-700"
                >
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Reset password'}
                </button>

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full text-center text-purple-600 hover:text-purple-700"
                >
                  Back to login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
