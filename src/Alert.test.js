import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert", function() {
    test("renders without crashing", function() {
        render(<Alert/>);
    });
    test("matches snapshot for danger messages", function() {
        let messages = ["this broke", "please help"];
        const { asFragment } = render(<Alert type="danger" messages={messages}/>);
        expect(asFragment()).toMatchSnapshot();
    });
    test("matches snapshot for success messages", function() {
        let messages = ["this works", "yay"];
        const { asFragment } = render(<Alert type="success" messages={messages}/>);
        expect(asFragment()).toMatchSnapshot();
    });
})