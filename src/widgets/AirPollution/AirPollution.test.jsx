import React from 'react';
import { render, screen } from '@testing-library/react';
import { AirPollution } from './AirPollution';

describe('AirPollution', () => {
  it('renders a preloader when data is null', () => {
    render(<AirPollution data={undefined} />);
    expect(screen.getByTestId('preloader'));
  });

  it('renders the air pollution data with corresponding classes', () => {
    const mockData = {
      list: [
        {
          main: {
            aqi: 1,
          },
          components: {
            pm2_5: 25,
            co: 12500,
          },
        },
      ],
    };
    render(<AirPollution data={mockData} />);
    expect(screen.getByText('Air Polutions'));
    expect(screen.getByText('Air quality index'));
    expect(screen.getByText('PM2.5'));
    expect(screen.getByText('CO'));
    expect(screen.getByText('1').classList.contains('itemDataColorGreen'));
    expect(screen.getByText('25').classList.contains('itemDataColorYellow'));
    expect(screen.getByText('12500').classList.contains('itemDataColorRed'));
  });
});
