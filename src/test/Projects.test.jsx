import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Projects from '../components/Projects';

describe('Projects', () => {
  it('renders featured projects and known project cards', () => {
    render(<Projects />);

    expect(
      screen.getByRole('heading', { name: /featured projects/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/butler: messaging system/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/portfolio website/i)
    ).toBeInTheDocument();
  });
});
