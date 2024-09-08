import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { UserProvider } from "../testUtils";

describe("JobCard", function() {
    test("it renders without crashing", function() {
        render(
            <UserProvider>
                <JobCard/>                
            </UserProvider>
    );
    });
    test("it matches snapshot", function() {
        let item = { title: "title", salary: 55555, equity: 55};
        const { asFragment } = render(
            <UserProvider>
                <JobCard item={item}/>
            </UserProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
