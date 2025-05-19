import React from 'react';

const notifications = [
  { id: 1, type: 'status', message: 'Your application for Frontend Developer is under review.' },
  { id: 2, type: 'status', message: 'Your application for Backend Developer was rejected.' },
  { id: 3, type: 'status', message: 'You have been selected for UI Designer!' },
];

const UserNotifications = () => {
  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Notifications
      </h3>
      <div className="space-y-6">
        {notifications.map(n => (
          <div key={n.id} className="flex items-center gap-4 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-6"> 
            <div className="text-blue-700 text-lg font-bold mb-1">Status Update</div>
            <div className="text-blue-900 font-medium">{n.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotifications; 