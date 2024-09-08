import React from "react";
import { render } from "@testing-library/react";
import CompanyList from "./CompanyList";

describe("CompanyList", function() {
    test("it renders without crashing", function() {
        render(<CompanyList/>);
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(<CompanyList/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
