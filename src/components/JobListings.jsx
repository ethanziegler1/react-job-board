import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
export default function JobListings({ isHomePage = false }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    let apiURL = isHomePage ? "/api/jobs?_limit=3" : "/api/jobs";

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(apiURL);
                const data = await res.json();
                setJobs(data);
            } catch (e) {
                console.log("Error fetching data: ", e);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);
    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHomePage ? "Recently Posted Jobs" : "Browse All Jobs"}
                </h2>
                {loading ? (
                    <div className="flex justify-center">
                        <CircleLoader />
                    </div>
                ) : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((job) => <JobCard key={job.id} job={job} />)}
                </div>}
            </div>
        </section >
    );
}
