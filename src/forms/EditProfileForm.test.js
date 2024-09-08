import React from "react";
import { render } from "@testing-library/react";
import EditProfileForm from "./EditProfileForm";
import { UserProvider } from "../testUtils";

describe("EditProfileForm", function() {
    test("it renders without crashing", function() {
        render(
            <UserProvider>
                <EditProfileForm/>
            </UserProvider>
        );
    });
    test("it matches snapshot", function() {
        const { asFragment } = render(
            <UserProvider>
                <EditProfileForm/>
            </UserProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});