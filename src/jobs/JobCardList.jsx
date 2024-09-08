import React from "react";
import JobCard from "./JobCard";

/**
 * renders JobCard components for each job passed into the function.
 */
function JobCardList({jobs}) {
    console.debug("JobCardList", "jobs=", jobs);

    return (
        <div className="JobCardList">
            {jobs.map(job => (
                <JobCard 
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}
        </div>
    )
}

export default JobCardList;