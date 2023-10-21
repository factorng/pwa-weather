import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastTab from "./ForecastTab";

describe("ForecastTab", () => {
  const todayForecast = [
    {
      dt: 1697576400,
      dt_txt: "2023-10-17T06:00:00",
      main: {
        temp: 6,
      },
      weather: [
        {
          icon: "03n",
        },
      ],
    },
    {
      dt: 1697576400,
      dt_txt: "2023-10-17T12:00:00",
      main: {
        temp: 12,
      },
      weather: [
        {
          icon: "03n",
        },
      ],
    },
    {
      dt: 1697576400,
      dt_txt: "2023-10-17T18:00:00",
      main: {
        temp: 18,
      },
      weather: [
        {
          icon: "03n",
        },
      ],
    },
    {
      dt: 1697576400,
      dt_txt: "2023-10-17T21:00:00",
      main: {
        temp: 21,
      },
      weather: [
        {
          icon: "03n",
        },
      ],
    },
  ];

  test("renders TimeForecastItem for each time period", () => {
    render(
      <ForecastTab todayForecast={todayForecast} dayToggle={"tomorrow"} />
    );

    expect(screen.getByText("morning")?.previousSibling?.textContent).toBe(
      "6°"
    );
    expect(screen.getByText("afternoon")?.previousSibling?.textContent).toBe(
      "12°"
    );
    expect(screen.getByText("evening")?.previousSibling?.textContent).toBe(
      "18°"
    );
    expect(screen.getByText("night")?.previousSibling?.textContent).toBe("21°");
  });
});
