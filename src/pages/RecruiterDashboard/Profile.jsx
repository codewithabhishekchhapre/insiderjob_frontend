import React, { useState } from 'react';

const initialProfile = {
  name: 'John Doe',
  email: 'john@company.com',
  bio: 'Experienced recruiter in tech.',
  companyExperience: 'Acme Corp, 3 years',
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    setProfile(form);
    setEditMode(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Profile
      </h3>
      {editMode ? (
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl max-w-lg">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Company Experience</label>
            <input name="companyExperience" value={form.companyExperience} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition">Save</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-300 px-4 py-2 rounded-xl font-semibold">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl max-w-lg">
          <div className="mb-2"><span className="font-semibold text-blue-700">Name:</span> {profile.name}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">Email:</span> {profile.email}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">Bio:</span> {profile.bio}</div>
          <div className="mb-2"><span className="font-semibold text-blue-700">Company Experience:</span> {profile.companyExperience}</div>
          <button onClick={() => setEditMode(true)} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition mt-4">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile; 