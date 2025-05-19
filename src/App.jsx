import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import  'quill/dist/quill.snow.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/Login'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import RecruiterDashboard from './pages/RecruiterDashboard/RecruiterDashboard'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import JobListingPage from './pages/JobListingPage'
import ApplyJob from './pages/UserDashboard/ApplyJob'

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Pass this function to all pages that use Navbar
  const handleLoginClick = () => setShowLoginModal(true);

  return (
    <div>
      <ToastContainer />
      {showLoginModal && (
        <Login onClose={() => setShowLoginModal(false)} />
      )}
      <Routes>
        <Route path='/' element={<Home onLoginClick={handleLoginClick} />}></Route>
        <Route path='/admin' element={<AdminDashboard onLoginClick={handleLoginClick} />} />
        <Route path='/recruiter' element={<RecruiterDashboard onLoginClick={handleLoginClick} />} />
        <Route path='/user' element={<UserDashboard onLoginClick={handleLoginClick} />} />
        <Route path='/jobs' element={<JobListingPage onLoginClick={handleLoginClick} />} />
        <Route path='/apply-job/:id' element={<ApplyJob onLoginClick={handleLoginClick} />} />
      </Routes>
    </div>
  )
}

export default App
