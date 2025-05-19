import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const MyJobs = () => {
  const userId = localStorage.getItem('userId');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get(`/api/application/user/${userId}/applied`);
        setApplications(res.data);
      } catch (err) {
        setError('Failed to fetch applied jobs');
      }
      setLoading(false);
    };
    fetchAppliedJobs();
  }, [userId]);

  const handleWithdraw = (id) => {
    setApplications(applications.filter(app => app._id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        My Jobs
      </h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-blue-100 mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
            <tr>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Job Title</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Company</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Recruiter</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Status</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-b hover:bg-blue-50/60 transition">
                <td className="py-2 px-4 font-semibold text-blue-900">{app.job?.title || '-'}</td>
                <td className="py-2 px-4">{app.job?.company?.name || '-'}</td>
                <td className="py-2 px-4">
                  {app.job?.recruiter?.name || '-'}
                  <br />
                  <span className="text-xs text-gray-500">{app.job?.recruiter?.email || ''}</span>
                </td>
                <td className="py-2 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'selected' ? 'bg-green-200 text-green-800' : app.status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>{app.status}</span>
                </td>
                <td className="py-2 px-4">
                  <button onClick={() => handleWithdraw(app._id)} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-1 rounded-xl font-semibold shadow transition">Withdraw</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs; 