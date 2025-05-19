import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import { FaBuilding, FaBriefcase, FaUserCircle, FaBell, FaClipboardList } from 'react-icons/fa';
import CompanyInteraction from './CompanyInteraction';
import JobPostManagement from './JobPostManagement';
import Applications from './Applications';
import Profile from './Profile';
import Notifications from './Notifications';

const sections = [
  { key: 'company', label: 'Company', icon: <FaBuilding /> },
  { key: 'jobs', label: 'Jobs', icon: <FaBriefcase /> },
  { key: 'applications', label: 'Applications', icon: <FaClipboardList /> },
  { key: 'profile', label: 'Profile', icon: <FaUserCircle /> },
  { key: 'notifications', label: 'Notifications', icon: <FaBell /> },
];

const RecruiterDashboard = ({ onLoginClick }) => {
  const [activeSection, setActiveSection] = useState('company');
  // Dummy profile info (replace with real user data if available)
  const profile = {
    name: 'Recruiter Name',
    role: 'Recruiter',
    avatar: '',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'company':
        return <CompanyInteraction />;
      case 'jobs':
        return <JobPostManagement />;
      case 'applications':
        return <Applications />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white font-sans">
      <Navbar onLoginClick={onLoginClick} />
      <div className="flex container mx-auto py-8 gap-8">
        {/* Sidebar */}
        <aside className="w-72 bg-gradient-to-br from-blue-700 via-purple-600 to-blue-500 rounded-3xl shadow-2xl flex flex-col py-8 px-6 min-h-[calc(100vh-64px)] text-white relative">
          {/* Profile Card */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-5xl mb-2 shadow-lg">
              {profile.avatar ? (
                <img src={profile.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <FaUserCircle />
              )}
            </div>
            <div className="text-lg font-bold tracking-wide">{profile.name}</div>
            <div className="text-purple-200 text-xs font-semibold uppercase tracking-wider">{profile.role}</div>
          </div>
          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.key}>
                  <button
                    className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 text-base font-medium hover:bg-white hover:bg-opacity-20 focus:outline-none ${activeSection === section.key ? 'bg-white bg-opacity-30 text-yellow-200 shadow-lg' : 'text-white'}`}
                    onClick={() => setActiveSection(section.key)}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* Decorative Blur */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400 opacity-30 rounded-full blur-3xl -z-10" />
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-10 bg-white bg-opacity-80 rounded-3xl shadow-xl backdrop-blur-md min-h-[80vh] border border-blue-100">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-3xl text-blue-700">
              {sections.find(s => s.key === activeSection)?.icon}
            </span>
            <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm">
              {sections.find(s => s.key === activeSection)?.label}
            </h1>
          </div>
          <div className="animate-fadein">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard; 