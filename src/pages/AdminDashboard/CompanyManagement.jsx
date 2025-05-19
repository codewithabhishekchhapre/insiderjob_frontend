import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const sizeOptions = ['1-10', '11-50', '51-200', '201-500', '500+'];

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [form, setForm] = useState({ name: '', size: '', address: '', website: '', description: '', logo: '' });
  const [logoPreview, setLogoPreview] = useState('');

  // Fetch companies on mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/company/all');
      setCompanies(res.data);
    } catch (err) {
      setError('Failed to fetch companies');
    }
    setLoading(false);
  };

  const handleEdit = (company) => {
    setEditCompany(company);
    setForm({ ...company, logo: '' });
    setLogoPreview(company.logo || '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    setLoading(true);
    setError('');
    try {
      await api.delete(`/api/company/${id}`);
      setCompanies(companies.filter(c => c._id !== id));
    } catch (err) {
      setError('Failed to delete company');
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setEditCompany(null);
    setForm({ name: '', size: '', address: '', website: '', description: '', logo: '' });
    setLogoPreview('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo' && files && files[0]) {
      const file = files[0];
      setForm(f => ({ ...f, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('size', form.size);
      formData.append('address', form.address);
      formData.append('website', form.website);
      formData.append('description', form.description);
      if (form.logo) formData.append('logo', form.logo);
      let res;
      if (editCompany) {
        res = await api.put(`/api/company/${editCompany._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCompanies(companies.map(c => c._id === editCompany._id ? res.data : c));
      } else {
        res = await api.post('/api/company/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCompanies([...companies, res.data]);
      }
      setShowModal(false);
      setForm({ name: '', size: '', address: '', website: '', description: '', logo: '' });
      setLogoPreview('');
      setEditCompany(null);
    } catch (err) {
      setError('Failed to save company');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
          Company Management
        </h3>
        <button onClick={handleCreate} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition">+ Create Company</button>
      </div>
      {loading && <div className="text-blue-600 mb-2">Loading...</div>}
      {error && <div className="text-red-500 mb-2 font-semibold">{error}</div>}
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-blue-100 mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
            <tr>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Logo</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Name</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Description</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Website</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Size</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Address</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company._id} className="border-b hover:bg-blue-50/60 transition">
                <td className="py-2 px-4">
                  {company.logo ? (
                    <img src={company.logo} alt="logo" className="w-10 h-10 object-cover rounded-full border" />
                  ) : (
                    <span className="text-gray-400">No Logo</span>
                  )}
                </td>
                <td className="py-2 px-4 font-semibold text-blue-900">{company.name}</td>
                <td className="py-2 px-4">{company.description}</td>
                <td className="py-2 px-4 text-blue-600 underline cursor-pointer hover:text-purple-600 transition">{company.website}</td>
                <td className="py-2 px-4">{company.size}</td>
                <td className="py-2 px-4">{company.address}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => handleEdit(company)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Edit</button>
                  <button onClick={() => handleDelete(company._id)} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-100">
            <h4 className="text-xl font-bold mb-6 text-blue-700">{editCompany ? 'Edit Company' : 'Create Company'}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Size</label>
                <select name="size" value={form.size} onChange={handleChange} required className="w-full border px-3 py-2 rounded-xl">
                  <option value="">Select size</option>
                  {sizeOptions.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Address</label>
                <input name="address" value={form.address} onChange={handleChange} required className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Website URL</label>
                <input name="website" value={form.website} onChange={handleChange} required className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Logo</label>
                <input name="logo" type="file" accept="image/*" onChange={handleChange} className="w-full" />
                {logoPreview && <img src={logoPreview} alt="logo preview" className="w-16 h-16 object-cover rounded-full mt-2 border" />}
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement; 