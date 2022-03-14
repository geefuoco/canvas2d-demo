import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

  beforeEach(() => setup());

  it("should render the component", () => {
    expect(screen.getByTestId("home")).toBeTruthy();
  });
});
