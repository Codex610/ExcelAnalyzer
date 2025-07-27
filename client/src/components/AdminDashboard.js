import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } });
        setStats(res.data);
      } catch {}
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data);
      } catch {}
    };

    fetchStats();
    fetchUsers();
  }, [token]);

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(users.filter(u => u._id !== id));
    } catch (e) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-5">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="p-4 bg-blue-50 rounded shadow text-center">
          <p className="text-3xl font-bold">{stats.userCount ?? '-'}</p>
          <p className="text-gray-600">Users</p>
        </div>
        <div className="p-4 bg-green-50 rounded shadow text-center">
          <p className="text-3xl font-bold">{stats.fileCount ?? '-'}</p>
          <p className="text-gray-600">Files Uploaded</p>
        </div>
        <div className="p-4 bg-purple-50 rounded shadow text-center">
          <p className="text-3xl font-bold">{stats.analysisCount ?? '-'}</p>
          <p className="text-gray-600">Analyses</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">Manage Users</h3>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-600">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;