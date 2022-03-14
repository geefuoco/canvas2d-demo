import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RandomWalkCanvas from "./RandomWalkCanvas";

describe("RandomWalkCanvas", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <RandomWalkCanvas height={800} width={1600} />
      </BrowserRouter>
    );

  beforeEach(() => setup());

  it("should render the component", () => {
    expect(screen.getByTestId("randomwalk-canvas"));
  });
});
