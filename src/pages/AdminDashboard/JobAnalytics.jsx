import React from 'react';

const jobStats = [
  { company: 'Acme Corp', totalJobs: 12 },
  { company: 'Beta Inc', totalJobs: 7 },
];

const applicationsPerJob = [
  { job: 'Frontend Dev', applications: 30 },
  { job: 'Backend Dev', applications: 18 },
  { job: 'Designer', applications: 12 },
];

const activeRecruiters = [
  { name: 'Bob', jobsPosted: 8 },
  { name: 'Alice', jobsPosted: 6 },
];

const JobAnalytics = () => {
  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Job Post Analytics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl">
          <h4 className="font-semibold mb-4 text-blue-700 text-lg">Total Job Posts by Company</h4>
          <ul>
            {jobStats.map(stat => (
              <li key={stat.company} className="flex justify-between py-2 border-b last:border-b-0">
                <span className="font-semibold text-blue-900">{stat.company}</span>
                <span className="font-bold text-purple-700">{stat.totalJobs}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl">
          <h4 className="font-semibold mb-4 text-blue-700 text-lg">Most Active Recruiters</h4>
          <ul>
            {activeRecruiters.map(r => (
              <li key={r.name} className="flex justify-between py-2 border-b last:border-b-0">
                <span className="font-semibold text-blue-900">{r.name}</span>
                <span className="font-bold text-purple-700">{r.jobsPosted} jobs</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-8 rounded-2xl shadow-xl">
        <h4 className="font-semibold mb-6 text-blue-700 text-lg">Applications per Job</h4>
        <div className="space-y-5">
          {applicationsPerJob.map(app => (
            <div key={app.job}>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-blue-900">{app.job}</span>
                <span className="font-bold text-purple-700">{app.applications}</span>
              </div>
              <div className="w-full bg-blue-100 rounded h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-400 h-3 rounded" style={{ width: `${app.applications * 2}px`, maxWidth: '100%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobAnalytics; 