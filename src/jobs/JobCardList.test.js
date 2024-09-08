import React from "react";
import { render } from "@testing-library/react";
import JobCardList from "./JobCardList";
import { UserProvider } from "../testUtils";

describe("JobCardList", function() {
    let jobs =  [{
        id: 1,
        title: "title",
        salary: 5555,
        equity: 5,
        companyName: "company name",
    }];
    test("it renders without crashing", function() {
        render(
            <UserProvider>
                <JobCardList jobs={jobs}/>                
            </UserProvider>
        );
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(
            <UserProvider>
                <JobCardList jobs={jobs}/>                
            </UserProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
