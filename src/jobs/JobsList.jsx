import React, { useState, useEffect } from "react";
import SearchForm from "../forms/SearchForm";
import JoblyApi from "../../api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../LoadingSpinner";

/**
 * Returns a list of jobs from the API. Uses the searchForm component
 * to filter jobs by name. Passes the list of jobs to JobCardList.
 */
function JobsList() {
    const [jobs, setJobs] = useState(null);
    console.debug("JobList");

    useEffect(function fetchAllJobsOnMount() {
        console.debug("JobList useEffect fetchAllJobsOnMount");
        search();
    }, []);
    
    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingSpinner/>;

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search}/>
            {jobs.length 
                ? <JobCardList jobs={jobs}/>
                : <p className="lead">Sorry, no results were found!</p>
            }
        </div>
    )
}

export default JobsList;