import { useNavigate } from "react-router-dom"
import {assets} from '../assets/assets'

const Navbar = ({ onLoginClick, showJobsButton, onJobsClick }) =>{
    const navigate = useNavigate()
    const isLoggedIn = Boolean(localStorage.getItem('userToken'));
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        window.location.href = '/';
    };
    return(
        <div className="shadow py-4">
            <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
                <img onClick={() => navigate('/')} className="cursor-pointer" src={assets.logo} alt="" />
                <div className="flex gap-4 max-sm:text-xs ">
                    {showJobsButton && (
                        <button onClick={onJobsClick} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">Jobs</button>
                    )}
                    {!isLoggedIn && (
                        <button onClick={onLoginClick} className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full">Login / Register</button>
                    )}
                    {isLoggedIn && (
                        <button onClick={handleLogout} className="bg-red-500 text-white px-6 sm:px-9 py-2 rounded-full">Logout</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar