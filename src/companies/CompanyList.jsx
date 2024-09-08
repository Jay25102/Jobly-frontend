import React, { useState, useEffect} from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../forms/SearchForm";


/**
 * Fetches list of companies from the API on load.
 * 
 * Renders a company card to display company info for each
 * company.
 */
function CompanyList() {
    const [companies, setCompanies] = useState(null);
    console.debug("CompanyList");

    useEffect(function fetchCompaniesOnMount() {
        console.debug("CompanyList useEffect fetchCompaniesOnMount");
        search();
    }, []);

    async function search(name) {
        let response = await JoblyApi.getCompanies(name);
        setCompanies(response);
    }

    if (!companies) return <div>loading...</div>

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search}/>
            {companies.map(c => (
                <CompanyCard 
                    key={c.handle}
                    handle={c.handle}
                    name={c.name}
                    description={c.description}
                    logoUrl={c.logoUrl}
                />
            ))}
        </div>
    )
}

export default CompanyList;