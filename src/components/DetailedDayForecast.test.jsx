import React from "react";
import { render, screen } from "@testing-library/react";
import DetailedDayForecast from "./DetailedDayForecast";

describe("DetailedDayForecast", () => {
  it("displays a preloader when data is null", () => {
    render(<DetailedDayForecast apiData={undefined} />);
    expect(screen.getByTestId("preloader"));
  });

  it("renders the detailed forecast when data is not null", () => {
    const mockData = {
      name: "Test City",
      main: {
        temp: 20,
        humidity: 25,
        pressure: 30,
      },
      weather: [
        {
          icon: "04d",
          description: "scattered clouds",
        },
      ],
      wind: {
        speed: 5,
      },
    };
    const mockOnInput = jest.fn();
    const mockOnHintClick = jest.fn();
    const { container } = render(
      <DetailedDayForecast
        apiData={mockData}
        onInput={mockOnInput}
        searchHints={[]}
        onHintClick={mockOnHintClick}
      />
    );
    screen.logTestingPlaygroundURL();
    expect(container.querySelector("input")?.value).toBe("Test City");
    expect(screen.getByText("20°"));
    expect(screen.getByText("scattered clouds"));
    expect(screen.getByText("25%"));
    expect(screen.getByText("30kPa"));
    expect(screen.getByText("5m/c"));
  });
});
