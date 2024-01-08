import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputText } from './InputText';

describe('Input field', () => {
  beforeEach(() => {
    const app = (
      <InputText value={'some value'} onInputChangeHanlder={() => null} />
    );
    render(app);
  });
  it('should render input field', () => {
    expect(screen.getByTestId('input'));
  });
  it('should has "input" class', () => {
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('input');
  });
  it('should should has "some value" in the input field', () => {
    const input = screen.getByTestId('input');
    expect(input).toHaveDisplayValue('some value');
  });
});
