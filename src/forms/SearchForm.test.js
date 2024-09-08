import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm", function() {
    test("it renders without crashing", function() {
        render(<SearchForm/>);
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(<SearchForm/>);
        expect(asFragment()).toMatchSnapshot();
    });
});