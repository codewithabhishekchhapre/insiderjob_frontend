import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const JobPostManagement = () => {
  const recruiterId = localStorage.getItem('userId');
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', location: '', experience: '', salary: '', skills: '', position: '', status: 'active' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const fetchJobs = async () => {
    if (!recruiterId) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/api/job/my?recruiterId=${recruiterId}`);
      setJobs(res.data);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
    setLoading(false);
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setForm({ ...job, skills: job.skills ? job.skills.join(', ') : '' });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (!recruiterId) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.delete(`/api/job/${id}`, { data: { recruiter: recruiterId } });
      setSuccess('Job deleted successfully');
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete job');
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setEditJob(null);
    setForm({ title: '', description: '', location: '', experience: '', salary: '', skills: '', position: '', status: 'active' });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recruiterId) return;
    setLoading(true);
    setError('');
    setSuccess('');
    const jobData = { ...form, skills: form.skills.split(',').map(s => s.trim()), recruiter: recruiterId };
    try {
      if (editJob) {
        await api.put(`/api/job/${editJob._id}`, { ...jobData });
        setSuccess('Job updated successfully');
      } else {
        await api.post('/api/job/create', jobData);
        setSuccess('Job created successfully');
      }
      setShowModal(false);
      setForm({ title: '', description: '', location: '', experience: '', salary: '', skills: '', position: '', status: 'active' });
      setEditJob(null);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save job');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
          Job Post Management
        </h3>
        <button onClick={handleCreate} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition">+ Create Job</button>
      </div>
      {error && <div className="text-red-500 mb-2 font-semibold">{error}</div>}
      {success && <div className="text-green-600 mb-2 font-semibold">{success}</div>}
      {loading ? (
        <div className="text-blue-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-blue-100 mb-8">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Title</th>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Location</th>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Experience</th>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Salary</th>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Status</th>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id} className="border-b hover:bg-blue-50/60 transition">
                  <td className="py-2 px-4 font-semibold text-blue-900">{job.title}</td>
                  <td className="py-2 px-4">{job.location}</td>
                  <td className="py-2 px-4">{job.experience}</td>
                  <td className="py-2 px-4">{job.salary}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'active' ? 'bg-green-200 text-green-800' : job.status === 'paused' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{job.status}</span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => handleEdit(job)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Edit</button>
                    <button onClick={() => handleDelete(job._id)} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-100">
            <h4 className="text-xl font-bold mb-6 text-blue-700">{editJob ? 'Edit Job' : 'Create Job'}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input name="title" value={form.title} onChange={handleChange} required className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Experience</label>
                <input name="experience" value={form.experience} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Salary</label>
                <input name="salary" value={form.salary} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Skills (comma separated)</label>
                <input name="skills" value={form.skills} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Position</label>
                <input name="position" value={form.position} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded-xl">
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostManagement; 