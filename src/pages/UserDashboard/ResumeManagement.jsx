import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ResumeManagement = () => {
  const userId = localStorage.getItem('userId'); // Replace with real auth/user context
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get(`/api/users/me?userId=${userId}`);
        setResumes(res.data.user.resumes || []);
      } catch (err) {
        setError('Failed to fetch resumes');
      }
      setLoading(false);
    };
    fetchResumes();
  }, []);

  const handleUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const formData = new FormData();
      formData.append('resume', e.target.files[0]);
      formData.append('isDefault', resumes.length === 0); // first upload is default
      formData.append('userId', userId);
      try {
        const res = await api.post(`/api/users/${userId}/upload-resume`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setResumes(res.data.resumes);
        setFile(null);
      } catch (err) {
        setError('Failed to upload resume');
      }
    }
  };

  // Placeholder for set default and delete (not implemented in backend)
  const handleSetDefault = (url) => {
    setResumes(resumes.map(r => ({ ...r, isDefault: r.url === url })));
  };
  const handleDelete = (url) => {
    setResumes(resumes.filter(r => r.url !== url));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Resume Management
      </h3>
      <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl max-w-2xl mb-8">
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Resume</label>
          <input type="file" onChange={handleUpload} className="w-full" />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
            <tr>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Resume</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Default</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map(resume => (
              <tr key={resume.url} className="border-b hover:bg-blue-50/60 transition">
                <td className="py-2 px-4 font-semibold text-blue-900">{resume.name}</td>
                <td className="py-2 px-4">
                  {resume.isDefault ? <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-200 text-green-800">Default</span> : (
                    <button onClick={() => handleSetDefault(resume.url)} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-3 py-1 rounded-xl font-semibold shadow hover:scale-105 transition">Set Default</button>
                  )}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <a href={resume.url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Preview</a>
                  <a href={resume.url} download className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Download</a>
                  <button onClick={() => handleDelete(resume.url)} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumeManagement; 