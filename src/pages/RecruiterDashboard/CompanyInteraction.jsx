import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const recruiterId = localStorage.getItem('userId');

const CompanyInteraction = () => {
  const [joinedCompany, setJoinedCompany] = useState(null);
  const [allCompanies, setAllCompanies] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllCompanies();
    fetchJoinedCompany();
  }, []);

  const fetchAllCompanies = async () => {
    try {
      const res = await api.get('/api/company/all');
      setAllCompanies(res.data);
    } catch (err) {
      setError('Failed to fetch companies');
    }
  };

  const fetchJoinedCompany = async () => {
    if (!recruiterId) return;
    try {
      const res = await api.get(`/api/users/${recruiterId}/company`);
      setJoinedCompany(res.data || null);
    } catch (err) {
      setJoinedCompany(null);
    }
  };

  const handleJoin = async (companyId) => {
    if (!recruiterId) {
      setError('Please log in as a recruiter to join a company.');
      return;
    }
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await api.post(`/api/company/${companyId}/join`, { recruiterId });
      setJoinedCompany(res.data.company);
      setMessage('Successfully joined company!');
      fetchAllCompanies();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to join company');
    }
    setLoading(false);
  };

  const handleLeave = async () => {
    if (!recruiterId) {
      setError('Please log in as a recruiter to leave a company.');
      return;
    }
    if (!joinedCompany) return;
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await api.post(`/api/company/${joinedCompany._id}/leave`, { recruiterId });
      setJoinedCompany(null);
      setMessage('You have left the company.');
      fetchAllCompanies();
    } catch (err) {
      setError('Failed to leave company');
    }
    setLoading(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Company Interaction
      </h3>
      {(!recruiterId) && <div className="text-red-500 mb-2">Please log in as a recruiter to join or leave a company.</div>}
      {message && <div className="text-green-600 mb-2 font-semibold">{message}</div>}
      {error && <div className="text-red-500 mb-2 font-semibold">{error}</div>}
      {joinedCompany ? (
        <div className="bg-white/70 backdrop-blur-md border border-blue-100 p-6 rounded-2xl shadow-xl mb-8 flex flex-col gap-2">
          <div className="text-lg font-bold text-blue-700 flex items-center gap-2">
            <span className="inline-block w-2 h-5 bg-gradient-to-b from-blue-400 to-purple-300 rounded-full" />
            Joined Company: <span className="font-extrabold text-purple-700">{joinedCompany.name}</span>
          </div>
          <div className="mb-1 text-sm text-gray-700 italic">{joinedCompany.description}</div>
          <div className="mb-1 text-sm">Website: <a href={joinedCompany.website} className="text-blue-600 underline hover:text-purple-600 transition">{joinedCompany.website}</a></div>
          <button onClick={handleLeave} className="mt-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition disabled:opacity-50" disabled={loading || !recruiterId}>Leave Company</button>
        </div>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {allCompanies.map(c => (
          <div key={c._id} className="bg-white/60 backdrop-blur-md border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-[1.03] transition">
            <div>
              <div className="text-xl font-bold text-blue-700 mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-5 bg-gradient-to-b from-blue-400 to-purple-300 rounded-full" />
                {c.name}
              </div>
              <div className="text-gray-700 mb-2 italic">{c.description}</div>
              <div className="text-sm text-gray-500 mb-1">Size: <span className="font-semibold text-blue-600">{c.size}</span></div>
              <div className="text-sm text-gray-500 mb-1">Website: <a href={c.website} className="text-blue-600 underline hover:text-purple-600 transition">{c.website}</a></div>
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-5 py-2 rounded-xl mt-4 font-semibold shadow hover:scale-105 transition disabled:opacity-50"
              onClick={() => handleJoin(c._id)}
              disabled={!!joinedCompany || loading || !recruiterId}
            >
              {joinedCompany ? 'Already Joined' : 'Join Company'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInteraction; 