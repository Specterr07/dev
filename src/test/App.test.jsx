import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders key landing page sections', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /building digital experiences/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /featured projects/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /let's connect/i })
    ).toBeInTheDocument();
  });
});
