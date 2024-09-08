import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/**
 * Displays info about companies
 * 
 * Rendered by CompanyList
 */
function CompanyCard({name, handle, description, logoUrl}) {
    console.debug("CompanyCard", logoUrl);

    return (
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
            <div className="card-body">
                <h6 className="card-title">
                    {logoUrl && <img src={logoUrl} alt={name}/>}
                    {name}
                </h6>
                <p><small>{description}</small></p>
            </div>
        </Link>
    )
}

export default CompanyCard;