import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

const MOCKED_DATA_HINTS = new Array(10).fill({}).map(
  (obj, i) =>
    (obj = {
      id: i,
      name: "test city",
      state: "test state",
      country: "test country",
      coord: { lat: 0, lon: 0 },
    })
);
describe("Input", () => {
  beforeEach(() => {
    const app = (
      <Input
        value=""
        onInputChangeHanlder={() => null}
        hints={MOCKED_DATA_HINTS}
        onHintClick={() => null}
        handleLocationClick={() => null}
      />
    );
    render(app);
  });
  it("should render input field component", () => {
    expect(screen.getByTestId("input"));
  });
  it("should render hints  component", () => {
    expect(screen.getByTestId("hints"));
  });
});
