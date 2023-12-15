import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Preloader } from './Preloader';

describe('Preloader', () => {
  beforeEach(() => {
    const app = <Preloader />;
    render(app);
  });
  it('should render preloader', () => {
    expect(screen.getByTestId('preloader'));
  });
});
