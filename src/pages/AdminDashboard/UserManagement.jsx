import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/users/all');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    setError('');
    try {
      await api.delete(`/api/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
    setLoading(false);
  };

  const handleRoleChange = async (id, newRole) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.put(`/api/users/${id}/role`, { role: newRole });
      setUsers(users.map(u => u._id === id ? res.data.user : u));
    } catch (err) {
      setError('Failed to change user role');
    }
    setLoading(false);
  };

  const filteredUsers = roleFilter === 'All' ? users : users.filter(u => u.role === roleFilter);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
          User Management
        </h3>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="border px-3 py-2 rounded-xl font-semibold bg-white/80 backdrop-blur-md border-blue-100 shadow">
          <option value="All">All Roles</option>
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {loading && <div className="text-blue-600 mb-2">Loading...</div>}
      {error && <div className="text-red-500 mb-2 font-semibold">{error}</div>}
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-blue-100 mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
            <tr>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Name</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Email</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Role</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="border-b hover:bg-blue-50/60 transition">
                <td className="py-2 px-4 font-semibold text-blue-900">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <select value={user.role} onChange={e => handleRoleChange(user._id, e.target.value)} className="border px-2 py-1 rounded-xl font-semibold bg-white/80 backdrop-blur-md border-blue-100 shadow">
                    <option value="user">User</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button onClick={() => handleDelete(user._id)} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 