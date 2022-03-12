import React from "react";
import { screen, render } from "@testing-library/react";
import RaycastCanvas from "./RaycastCanvas";

describe("Canvas", () => {
  const setup = () => render(<RaycastCanvas width={1200} height={800} />);

  beforeEach(() => setup());

  it("should render the canvas element", () => {
    expect(screen.getByTestId("canvas")).toBeTruthy();
  });
});
