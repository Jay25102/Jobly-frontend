import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router-dom";

describe("JobCard", function() {
    test("it renders without crashing", function() {
        render(
            <MemoryRouter>
                <CompanyCard
                    handle="handle"
                    name="name"
                    description="description here"
                    logoUrl="/logos/logo1.jpg"
                />                
            </MemoryRouter>
    );
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(
            <MemoryRouter>
                <CompanyCard
                    handle="handle"
                    name="name"
                    description="description here"
                    logoUrl="/logos/logo1.jpg"
                />                
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
