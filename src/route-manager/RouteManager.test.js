import React from "react";
import { render } from "@testing-library/react";
import RouteManager from "./RouteManager";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

describe("RouteManager", function() {
    test("it renders without crashing", function() {
        render(
            <MemoryRouter>
                <UserProvider>
                    <RouteManager/>
                </UserProvider>
            </MemoryRouter>
        );
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(
            <MemoryRouter>
                <UserProvider>
                    <RouteManager/>
                </UserProvider>
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});