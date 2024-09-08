import React from "react";
import { render } from "@testing-library/react";
import CompanyDetail from "./CompanyDetail";
import { UserProvider } from "../testUtils";

describe("JobCard", function() {
    test("it renders without crashing", function() {
        render(
            <UserProvider>
                <CompanyDetail/>                
            </UserProvider>
    );
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(
            <UserProvider>
                <CompanyDetail/>
            </UserProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
