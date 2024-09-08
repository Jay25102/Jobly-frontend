import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";

describe("SignupForm", function() {
    test("it renders without crashing", function() {
        render(<SignupForm/>);
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(<SignupForm/>);
        expect(asFragment()).toMatchSnapshot();
    });
});