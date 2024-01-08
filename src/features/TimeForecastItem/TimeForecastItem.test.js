/* eslint-disable camelcase */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimeForecastItem } from './TimeForecastItem';

jest.mock('../hooks/useImage', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    error: undefined,
    image: 'test-image-url',
  }),
}));

describe('Time Forecast Item', () => {
  it('should render temperature, period and weathre icon', () => {
    const mockForecast = {
      dt: 1697576400,
      dt_txt: '2023-10-17T21:00:00',
      main: {
        feels_like: 0.83,
        grnd_level: 1004,
        humidity: 77,
        pressure: 1004,
        sea_level: 1004,
        temp: 3.7,
        temp_max: 3.7,
        temp_min: 2.83,
      },
      weather: [
        {
          description: 'scattered clouds',
          icon: '03n',
          id: 802,
          main: 'Clouds',
        },
      ],
      wind: {
        speed: 3.15,
        deg: 316,
        gust: 7.71,
      },
    };
    render(<TimeForecastItem timePeriod="Morning" forecast={mockForecast} />);
    expect(screen.getByRole('img').getAttribute('src')).toBe('test-image-url');
    expect(screen.getByText('3°'));
    expect(screen.getByText('Morning'));
  });
});
