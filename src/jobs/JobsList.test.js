import React from "react";
import { render } from "@testing-library/react";
import JobsList from "./JobsList";

describe("JobsList", function() {
    test("it renders without crashing", function() {
        render(<JobsList/>);
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(<JobsList/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
