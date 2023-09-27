import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputField } from "./InputField";

describe("Input field", () => {
  beforeEach(() => {
    const app = (
      <InputField value={"some value"} onInputChangeHanlder={() => null} />
    );
    render(app);
  });
  it("should render input field", () => {
    expect(screen.getByTestId("input"));
  });
  it('should has "input" class', () => {
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toHaveClass("input");
  });
  it('should should has "some value" in the input field', () => {
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toHaveDisplayValue("some value");
  });
});
