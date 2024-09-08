import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

describe("Navbar", function() {
    test("it renders without crashing", function() {
        render(
            <MemoryRouter>
                <UserProvider>
                    <Navbar/>
                </UserProvider>
            </MemoryRouter>
        );
    });
    test("it matches snapshot logged in", function() {
        const { asFragment } = render(
            <MemoryRouter>
                <UserProvider>
                    <Navbar/>
                </UserProvider>
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
    test("it matches snapshot logged out", function() {
        const { asFragment } = render(
            <MemoryRouter>
                <UserProvider currentUser={null}>
                    <Navbar/>
                </UserProvider>
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});