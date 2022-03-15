import React from "react";
import { screen, render } from "@testing-library/react";
import SteerCanvas from "./SteerCanvas";

describe("SteerCanvas", () => {
  const setup = () => render(<SteerCanvas width={1600} height={800} />);

  beforeEach(() => setup());

  it("should render the component", () => {
    expect(screen.getByTestId("steer-canvas")).toBeTruthy();
  });
});
