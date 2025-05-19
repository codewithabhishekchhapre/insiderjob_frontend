import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

// Helper to get token from cookies
function getTokenFromCookies() {
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getTokenFromCookies();
        const res = await api.get(`/api/users/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setProfile(res.data.user);
        setForm(res.data.user);
      } catch (err) {
        setError('Failed to fetch profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files && files[0]) {
      setResumeFile(files[0]);
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });
      if (resumeFile) formData.append('resume', resumeFile);
      const token = getTokenFromCookies();
      const res = await api.put(`/api/users/${userId}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setProfile(res.data.user);
      setEditMode(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Profile
      </h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {editMode ? (
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl max-w-lg">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input name="name" value={form.name || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Bio</label>
            <input name="bio" value={form.bio || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Company Experience</label>
            <input name="companyExperience" value={form.companyExperience || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Portfolio (optional)</label>
            <input name="portfolio" value={form.portfolio || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">LinkedIn (optional)</label>
            <input name="linkedin" value={form.linkedin || ''} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition">Save</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-300 px-4 py-2 rounded-xl font-semibold">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl max-w-lg">
          <div className="mb-2"><span className="font-semibold text-blue-700">Name:</span> {profile?.name}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">Email:</span> {profile?.email}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">Bio:</span> {profile?.bio}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">Company Experience:</span> {profile?.companyExperience}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">Portfolio:</span> {profile?.portfolio}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">LinkedIn:</span> {profile?.linkedin}</div>
          <button onClick={() => setEditMode(true)} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition mt-4">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 