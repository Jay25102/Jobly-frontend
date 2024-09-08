import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";

describe("App", function() {
    test("renders without crashing", function() {
        render(<App/>);
    });
    test("matches snapshot", function() {
        const { asFragment } = render(<App/>);
        expect(asFragment()).toMatchSnapshot();
    });
})