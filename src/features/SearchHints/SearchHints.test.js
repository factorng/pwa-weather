import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchHints } from './SearchHints';

const MOCKED_DATA_HINTS = new Array(10).fill({}).map(
  (obj, i) =>
    (obj = {
      id: i,
      name: 'test city',
      state: 'test state',
      country: 'test country',
      coord: { lat: 0, lon: 0 },
    }),
);

const mockedCallback = jest.fn((x) => x);

describe('search hints', () => {
  beforeEach(() => {
    const app = (
      <SearchHints hints={MOCKED_DATA_HINTS} onHintClick={mockedCallback} />
    );
    render(app);
  });

  afterEach(cleanup);

  it('should render 6 elements with a city name on them', async () => {
    const hints = await screen.findAllByText('test city');
    expect(hints).toHaveLength(6);
    screen.logTestingPlaygroundURL();
  });
  it('callback should be called by clicking on the hint', () => {
    const hint = screen.getAllByTestId('hint');
    fireEvent.click(hint[0]);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
    expect(mockedCallback.mock.calls[0][0]).toBe(0);
  });
  it('callback should receive id as a parameter', () => {
    const hint = screen.getAllByTestId('hint');
    fireEvent.click(hint[4]);
    expect(mockedCallback.mock.calls[0][0]).toBe(4);
    fireEvent.click(hint[5]);
    expect(mockedCallback.mock.calls[1][0]).toBe(5);
  });
});
