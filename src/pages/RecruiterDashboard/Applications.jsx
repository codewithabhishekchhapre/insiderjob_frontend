import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const Applications = () => {
  const recruiterId = localStorage.getItem('userId'); // assuming recruiterId is stored as userId
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobsWithApplications = async () => {
      try {
        const res = await api.get(`/api/application/recruiter/${recruiterId}/jobs-applications`);
        setJobs(res.data);
        setSelectedJob(res.data[0] || null);
      } catch (err) {
        setError('Failed to fetch jobs and applications');
      }
      setLoading(false);
    };
    fetchJobsWithApplications();
  }, [recruiterId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Applications
      </h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex gap-8 mb-8">
        <div className="w-72">
          <h4 className="font-semibold mb-3 text-blue-700">Your Jobs</h4>
          <ul className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow divide-y">
            {jobs.map(job => (
              <li key={job._id} className={`p-4 cursor-pointer rounded-xl transition-all font-semibold text-blue-900 ${selectedJob && selectedJob._id === job._id ? 'bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg' : 'hover:bg-blue-50/60'}`} onClick={() => setSelectedJob(job)}>
                {job.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-8">
          <h4 className="font-semibold mb-6 text-blue-700 text-lg">Applications for: <span className="text-purple-700 font-bold">{selectedJob?.title || '-'}</span></h4>
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Candidate</th>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Status</th>
                <th className="py-3 px-4 text-left font-bold text-blue-700">Resume</th>
              </tr>
            </thead>
            <tbody>
              {selectedJob && selectedJob.applications.length > 0 ? (
                selectedJob.applications.map(app => (
                  <tr key={app._id} className="border-b hover:bg-blue-50/60 transition">
                    <td className="py-2 px-4 font-semibold text-blue-900">{app.name} <span className="text-xs text-gray-500">{app.email}</span></td>
                    <td className="py-2 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'applied' ? 'bg-blue-200 text-blue-800' : app.status === 'under review' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{app.status}</span>
                    </td>
                    <td className="py-2 px-4">
                      {app.resume ? (
                        <a href={app.resume} className="text-blue-600 underline hover:text-purple-600 transition" download>Download</a>
                      ) : (
                        <span className="text-gray-400">No Resume</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={3} className="text-center text-gray-500 py-4">No applications</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications; 