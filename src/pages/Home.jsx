import React, { useEffect, useState } from 'react';
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import JobListing from "../component/JobListing";
import AppDownload from "../component/AppDownload";
import Footer from "../component/Footer";
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Home = ({ onLoginClick }) => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all jobs for the home page
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
            <Navbar onLoginClick={onLoginClick} showJobsButton onJobsClick={() => navigate('/jobs')} />
            <Hero></Hero>
            <JobListing jobs={jobs} />
            <AppDownload></AppDownload>
            <Footer></Footer>
        </div>
    )
}

export default Home