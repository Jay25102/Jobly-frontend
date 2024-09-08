import React, { useState } from "react";
import "./SearchForm.css";

/**
 * Search component used in CompanyList and JobList components.
 * When submitted, the component calls the searchFor prop which
 * is a function defined by the components that render it.
 */
function SearchForm({searchFor}) {
    const [searchTerm, setSearchterm] = useState("");
    console.debug("SearchForm", "searchFor=", typeof searchFor);

    function handleSubmit(e) {
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchterm(searchTerm.trim());
    }

    function handleChange(e) {
        setSearchterm(e.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inlinne" onSubmit={handleSubmit}>
                <input 
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter term..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button className="btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SearchForm;