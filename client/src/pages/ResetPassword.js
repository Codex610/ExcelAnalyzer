// client/src/pages/ResetPassword.js
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`/api/auth/reset-password/${resetToken}`, { password });
      setMessage(res.data.message || 'Password reset successful. You can now log in.');
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message ||
          'Failed to reset password. The reset link may be invalid or expired.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

      {message && (
        <p className="mb-4 text-green-600 text-center font-medium">{message}</p>
      )}
      {error && (
        <p className="mb-4 text-red-600 text-center font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            New Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-1 font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Remembered your password?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}