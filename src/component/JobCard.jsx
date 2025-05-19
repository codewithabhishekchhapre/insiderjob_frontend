import { useNavigate } from "react-router-dom"

const JobCard = ({job}) =>{
    const navigate = useNavigate()
    return(
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-6 rounded-2xl shadow-xl flex flex-col gap-2 hover:shadow-2xl hover:scale-[1.03] transition">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                    {job.company?.logo && <img className="h-10 w-10 rounded-full object-cover border" src={job.company.logo} alt="Company Logo" />}
                    <div>
                        <div className="font-bold text-blue-700 text-lg">{job.company?.name || job.companyId?.name}</div>
                        <div className="text-xs text-gray-500">{job.company?.website || job.companyId?.website}</div>
                    </div>
                </div>
            </div>
            <h4 className="font-extrabold text-xl text-blue-900 mt-2">{job.title}</h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-semibold">{job.location}</span>
                {job.level && <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full font-semibold">{job.level}</span>}
            </div>
            <p className="text-gray-600 text-sm mt-4 min-h-[48px]" dangerouslySetInnerHTML={{__html:job.description?.slice(0,120)}}></p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">Recruiter:</span>
                <span className="font-semibold text-blue-700 text-xs">{job.recruiter?.name}</span>
                <span className="text-xs text-gray-400">{job.recruiter?.email}</span>
            </div>
            <div className="mt-4 flex gap-4 text-sm">
                <button onClick={() => {navigate(`/apply-job/${job._id}`); window.scrollTo(0,0)}} className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition">Apply now</button>
                <button onClick={() => {navigate(`/apply-job/${job._id}`); window.scrollTo(0,0)}} className="text-blue-700 border border-blue-400 rounded-xl px-4 py-2 font-semibold hover:bg-blue-50 transition">Learn more</button>
            </div>
        </div>
    )
}

export default JobCard