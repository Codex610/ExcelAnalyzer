// client/src/pages/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'If this email exists, a reset link has been sent.');
      setLoading(false);
      setEmail('');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>

        {message && (
          <p className="text-green-600 text-center font-medium">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}