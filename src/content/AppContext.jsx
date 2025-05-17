import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin,setShowRecruiterLogin] = useState(false)

    const [companyToken,setCompanyToken] = useState(null)
    const [companyData,setCompanyData] = useState(null)

    const [userData,setUserData] = useState(null) 
    const [userApplications,setUserApplications] = useState([]) 

    const createUserIfNotExists = async () => {
  try {
    const token = await getToken();

    await axios.post(`${backendUrl}/api/users/create-user`, {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.primaryEmailAddress?.emailAddress,
      image: user?.imageUrl
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

  } catch (err) {
    toast.error("User creation failed: " + err.message);
  }
};


    useEffect(() => {
    const createUser = async () => {
        const token = await getToken();
        await axios.post(backendUrl + '/api/users/create-user', {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.primaryEmailAddress?.emailAddress,
            image: user?.imageUrl
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    };

    if (user) {
        createUser();
        fetchUserData();
        fetchUserApplications();
    }
}, [user]);


    // Function to fetch jobs
    const fetchJobs = async () => {
        try {
            
            const {data} = await axios.get(backendUrl+'/api/jobs')

            if (data.success) {
                setJobs(data.jobs)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})

            if (data.success) {
                setCompanyData(data.company)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
          toast.error(error.message)  
        }
    }

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
           
            const  token = await getToken();

            const {data} = await axios.get(backendUrl+'/api/users/user',
                {headers:{Authorization:`Bearer ${token}`}})

                if (data.success) {
                   setUserData(data.user) 
                }else{
                    toast.error(data.message)
                }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch users applied application data
    const fetchUserApplications = async () => {
        try {
            
            const token = await getToken()

            const {data} = await axios.get(backendUrl+'/api/users/applications',
                {headers:{Authorization: `Bearer ${token}`}}
            )
            if (data.success) {
                setUserApplications(data.applications)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Retrive Company Token From LocalStorage
    useEffect(() =>{
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

    },[])

    // Fetch Company Data if Company Token is Available
    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    },[companyToken])

    // Fetch User's Applications & Data if User is Logged In
    useEffect(()=>{
        if (user) {
            fetchUserData()
            fetchUserApplications()
        }
    },[user])

    const value ={
        setSearchFilter, searchFilter,
        isSearched,setIsSearched,
        jobs, setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData,
        fetchUserApplications,
    }

    return ( 
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}