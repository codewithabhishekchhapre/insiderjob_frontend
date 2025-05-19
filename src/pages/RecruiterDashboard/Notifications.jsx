import React from 'react';
import { FaBell, FaBriefcase, FaUserCircle } from 'react-icons/fa';

const notifications = [
  { id: 1, type: 'application', message: 'New application for Frontend Developer.' },
  { id: 2, type: 'job', message: 'Your job post was updated.' },
  { id: 3, type: 'admin', message: 'Admin: Please update your profile.' },
];

const typeIcon = (type) => {
  switch (type) {
    case 'application': return <FaBriefcase className="text-blue-500" />;
    case 'job': return <FaBell className="text-purple-500" />;
    case 'admin': return <FaUserCircle className="text-pink-500" />;
    default: return <FaBell className="text-blue-400" />;
  }
};

const Notifications = () => {
  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Notifications
      </h3>
      <div className="space-y-6">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-center gap-4 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-6`}> 
            <div className="text-3xl">{typeIcon(n.type)}</div>
            <div>
              <div className="font-bold text-blue-700 mb-1 capitalize">{n.type} Notification</div>
              <div className="text-blue-900 font-medium">{n.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications; 