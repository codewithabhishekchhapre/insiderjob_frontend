import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../content/AppContext"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify"

const Login = ({ onClose }) =>{
    const navigate = useNavigate()
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)
    const [role, setRole] = useState('user')
    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)
    const { backendUrl, setUserData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if(state === "Sign Up" && !isTextDataSubmited){
           return setIsTextDataSubmited(true)
        }
        try {
            if (state === "Login") {
                const {data} = await axios.post(backendUrl + '/api/users/login',{email,password})
                if (data.success) {
                    setUserData(data.user)
                    localStorage.setItem('userToken',data.token)
                    localStorage.setItem('userId', data.user._id)
                    localStorage.setItem('userRole', data.user.role)
                    onClose()
                    if (data.user.role === 'admin') {
                        navigate('/admin')
                    } else if (data.user.role === 'recruiter') {
                        navigate('/recruiter')
                    } else if (data.user.role === 'user') {
                        navigate('/user')
                    } else {
                        navigate('/')
                    }
                }else{
                    toast.error(data.message)
                }
            }else{
                const formData = new FormData()
                formData.append('name',name)
                formData.append('password',password)
                formData.append('email',email)
                formData.append('image',image)
                formData.append('role',role)
                const {data} = await axios.post(backendUrl+'/api/users/signup',formData)
                if (data.success) {
                    setUserData(data.user)
                    localStorage.setItem('userToken',data.token)
                    localStorage.setItem('userId', data.user._id)
                    localStorage.setItem('userRole', data.user.role)
                    onClose()
                    if (data.user.role === 'admin') {
                        navigate('/admin')
                    } else if (data.user.role === 'recruiter') {
                        navigate('/recruiter')
                    } else if (data.user.role === 'user') {
                        navigate('/user')
                    } else {
                        navigate('/')
                    }
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Add logout functionality
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        // Optionally clear all localStorage: localStorage.clear();
        window.location.href = '/'; // or navigate('/')
    };

    useEffect(() =>{
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    },[])

    return(
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
            <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500 min-w-[320px] max-w-[90vw]">
                <button type="button" onClick={onClose} className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-gray-700">&times;</button>
                {localStorage.getItem('userToken') && (
                    <button type="button" onClick={handleLogout} className="absolute top-5 left-5 text-sm text-red-500 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50">Logout</button>
                )}
                <h1 className="text-center text-2xl text-neutral-700 font-medium">User {state}</h1>
                <p className="text-sm">Welcome back Please sign in to continue</p>
                {state === "Sign Up" && isTextDataSubmited 
                ?<>
                    <div className="flex item-center gap-4 my-10">
                        <label htmlFor="image">
                            <img className="w-16 rounded-full" src={ image ? URL.createObjectURL(image)  :  assets.upload_area} alt="" />
                            <input onChange={e => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                        <p>Upload Profile <br />Image</p>
                    </div>
                </>
                :<>
                {state !== 'Login' && (
                    <>
                    <div className="border px-4 py-2 flex items-center gap-2  rounded-full mt-5">
                        <img src={assets.person_icon} alt="" />
                        <input className="outline-none text-sm" onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Name" required />
                    </div>
                    <div className="border px-4 py-2 flex items-center gap-2  rounded-full mt-5">
                        <img src={assets.person_icon} alt="" />
                        <select className="outline-none text-sm w-full" value={role} onChange={e => setRole(e.target.value)} required>
                            <option value="user">User</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    </>
                )}
                <div  className="border px-4 py-2 flex items-center gap-2  rounded-full mt-5">
                    <img src={assets.email_icon} alt="" />
                    <input className="outline-none text-sm" onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email Id" required />
                </div>
                <div  className="border px-4 py-2 flex items-center gap-2  rounded-full mt-5">
                    <img src={assets.lock_icon} alt="" />
                    <input className="outline-none text-sm" onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
                </div>
            </>}
            {state === "Login" && <p className="text-sm text-blue-600 mt-4 cursor-pointer">Forgot password?</p> }
                <button type="submit" className="bg-blue-600 w-full text-white  py-2 rounded-full mt-4">
                    {state === 'Login' ? 'login' : isTextDataSubmited ? 'create account' : 'next'}
                </button>
                    {
                        state === 'Login'
                        ? <p className="mt-5 text-center">Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState("Sign Up")}>Sign Up</span></p>
                        : <p className="mt-5 text-center">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setState("Login")}>Login</span></p>
                    }
            </form>
        </div>
    )
}

export default Login