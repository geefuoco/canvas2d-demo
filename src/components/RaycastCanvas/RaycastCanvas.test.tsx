import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RaycastCanvas from "./RaycastCanvas";

describe("Canvas", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <RaycastCanvas width={1200} height={800} />
      </BrowserRouter>
    );

  beforeEach(() => setup());

  it("should render the canvas element", () => {
    expect(screen.getByTestId("raycast-canvas")).toBeTruthy();
  });
});
