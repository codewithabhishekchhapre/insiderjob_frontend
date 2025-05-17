import {useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './component/RecruiterLogin'
import { AppContext } from './content/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import  'quill/dist/quill.snow.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  const {showRecruiterLogin, companyToken} = useContext(AppContext)

  return (
    <div>
      { showRecruiterLogin && <RecruiterLogin/>}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/apply-job/:id' element={<ApplyJob/>}></Route>
        {/* <Route path='/applications/:id' element={<Applications/>}></Route> */}
        <Route path='/applications' element={<Applications/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}>
        {
        companyToken ? <>
          <Route path='add-job' element={<AddJob/>} />
          <Route path='manage-jobs' element={<ManageJobs/>} />
          <Route path='view-applications' element={<ViewApplications/>} />
        </> : null
        } 
        </Route>
      </Routes>
    </div>
  )
}

export default App
