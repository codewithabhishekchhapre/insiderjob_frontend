import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import ResumeManagement from './ResumeManagement';

const ApplyJob = ({ onLoginClick }) => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Replace with real auth/user context
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    console.log(userId);
    const fetchResumes = async () => {
      try {
        const res = await api.get(`/api/users/me?userId=${userId}`);
        setResumes(res.data.user.resumes || []);
        setShowUpload((res.data.user.resumes || []).length === 0);
      } catch (err) {
        setError('Failed to fetch resumes');
      }
      setLoading(false);
    };
    fetchResumes();
  }, []);

  const handleApply = async () => {
    if (!selectedResume) return;
    try {
      await api.post(`/api/job/${jobId}/apply`, {
        resumeUrl: selectedResume,
        userId,
      });
      alert('Application submitted!');
      navigate('/user');
    } catch (err) {
      setError('Failed to apply for job');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white/80 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Apply for Job</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {showUpload ? (
        <div>
          <p className="mb-4">You need to upload a resume before applying.</p>
          <ResumeManagement userId={userId} />
        </div>
      ) : (
        <div>
          <label className="block font-semibold mb-2">Select Resume</label>
          <div className="mb-4">
            {resumes.map(r => (
              <div key={r.url} className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="resume"
                  value={r.url}
                  checked={selectedResume === r.url}
                  onChange={() => setSelectedResume(r.url)}
                />
                <span>{r.name} {r.isDefault && <span className="text-green-600">(Default)</span>}</span>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-2">Preview</a>
              </div>
            ))}
          </div>
          <button
            onClick={handleApply}
            disabled={!selectedResume}
            className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplyJob; 