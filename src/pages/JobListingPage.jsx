import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import JobListing from '../component/JobListing';
import api from '../utils/api';

const JobListingPage = ({ onLoginClick }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/api/job');
        setJobs(res.data);
      } catch (err) {
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar onLoginClick={onLoginClick} showJobsButton />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">All Jobs</h1>
        <p className="mb-8 text-gray-600">Browse and apply to jobs from top companies and recruiters.</p>
        <JobListing jobs={jobs} />
      </div>
    </div>
  );
};

export default JobListingPage; 