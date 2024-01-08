/* eslint-disable camelcase */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ForecastTabs } from './ForecastTabs';


describe('ForecastTabs component', () => {
  it('displays the tabs and switches between them', () => {
    const mockData = {
      cod: 'h',
      list: [
        {
          dt: 1697576400,
          dt_txt: '2023-10-17T21:00:00',
          main: {
            temp: 3.7,
          },
          weather: [
            {
              icon: '03n',
            },
          ],
        },
        {
          dt: 1697576400,
          dt_txt: '2023-10-17T21:00:00',
          main: {
            temp: 3.7,
          },
          weather: [
            {
              icon: '03n',
            },
          ],
        },
      ],
    };

    render(<ForecastTabs apiData={mockData} />);

    const todayTab = screen.getByText('Today');
    const tomorrowTab = screen.getByText('Tomorrow');

    expect(todayTab.closest('button')?.className).toBe('timeForecastButton');
    expect(tomorrowTab.closest('button')?.className).toBe(
      'timeForecastButton timeForecastButtonInactive',
    );

    fireEvent.click(tomorrowTab);
    expect(todayTab.closest('button')?.className).toBe(
      'timeForecastButton timeForecastButtonInactive',
    );
    expect(tomorrowTab.closest('button')?.className).toBe('timeForecastButton');

    fireEvent.click(todayTab);
    expect(todayTab.closest('button')?.className).toBe('timeForecastButton');
    expect(tomorrowTab.closest('button')?.className).toBe(
      'timeForecastButton timeForecastButtonInactive',
    );
  });
});
