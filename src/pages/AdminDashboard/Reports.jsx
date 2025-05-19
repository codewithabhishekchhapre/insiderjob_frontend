import React from 'react';

const stats = [
  { label: 'Weekly Active Users', value: 1200, color: 'bg-blue-500' },
  { label: 'Resume Uploads', value: 340, color: 'bg-green-500' },
  { label: 'Applications/Week', value: 210, color: 'bg-purple-500' },
];

const Reports = () => {
  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Reports & Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map(stat => (
          <div key={stat.label} className={`rounded-2xl shadow-xl p-8 text-white/90 font-bold text-center bg-gradient-to-br from-blue-500 via-purple-500 to-blue-400 backdrop-blur-md border border-blue-100`}> 
            <div className="text-lg font-semibold mb-2 text-white/90">{stat.label}</div>
            <div className="text-4xl font-extrabold drop-shadow-sm">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports; 