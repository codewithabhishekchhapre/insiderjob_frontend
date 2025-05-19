import React from 'react';

const roles = [
  { role: 'Admin', permissions: ['All Access'] },
  { role: 'Recruiter', permissions: ['Create/Edit Jobs', 'View Applications'] },
  { role: 'User', permissions: ['Apply Jobs', 'Manage Profile'] },
];

const AccessControl = () => {
  return (
    <div>
      <h3 className="text-2xl font-extrabold text-blue-800 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-2" />
        Access Control (RBAC)
      </h3>
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-blue-100 mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
            <tr>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Role</th>
              <th className="py-3 px-4 text-left font-bold text-blue-700">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(r => (
              <tr key={r.role} className="border-b hover:bg-blue-50/60 transition">
                <td className="py-2 px-4 font-semibold text-blue-900">{r.role}</td>
                <td className="py-2 px-4">{r.permissions.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessControl; 