import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../LoadingSpinner";

/**
 * Displays info about company along with the jobs of that company.
 */
function CompanyDetail() {
    const { handle } = useParams();
    console.debug("CompanyDetail");

    const [company, setCompany] = useState(null);

    useEffect(function fetchCompanyOnMount() {
        console.debug("CompanyDetail useEffect fetchCompanyOnMount");
        async function fetchCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }
        fetchCompany();
    }, [handle]);

    if (!company) return <LoadingSpinner/>

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            {company.name}
            {company.description}
            <JobCardList jobs={company.jobs}/>
        </div>
    )
}

export default CompanyDetail;