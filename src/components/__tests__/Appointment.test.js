/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, fireEvent } from "@testing-library/react";
/*
  We import the component that we are testing
*/
import Application from "components/Application";


/*
  A test that renders a React Component
*/
describe("Appointment Test", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });

  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
  });

});
