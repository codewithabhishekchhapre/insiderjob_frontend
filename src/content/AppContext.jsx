import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [userData, setUserData] = useState(null)

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const {data} = await axios.get(backendUrl+'/api/users/user',
                {headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        backendUrl,
        userData, setUserData,
        fetchUserData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}