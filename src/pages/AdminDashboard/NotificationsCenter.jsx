import React from 'react';

const announcements = [
  { id: 1, title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2AM-4AM.', type: 'alert' },
  { id: 2, title: 'New Feature', message: 'Resume parsing is now live!', type: 'info' },
];

const NotificationsCenter = () => {
  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Notifications Center
      </h3>
      <div className="space-y-6">
        {announcements.map(a => (
          <div key={a.id} className={`rounded-2xl shadow-xl p-6 font-semibold bg-white/80 backdrop-blur-md border border-blue-100 flex flex-col gap-1 ${a.type === 'alert' ? 'border-l-8 border-red-500' : 'border-l-8 border-blue-500'}`}>
            <div className={`text-lg font-bold mb-1 ${a.type === 'alert' ? 'text-red-600' : 'text-blue-700'}`}>{a.title}</div>
            <div className="text-blue-900 font-medium">{a.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsCenter; 