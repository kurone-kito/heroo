import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CloseButton } from './CloseButton.jsx';

afterEach(() => cleanup());

describe('CloseButton', () => {
  it('renders a cross icon', () => {
    const { getByRole } = render(() => <CloseButton aria-label="close" />);
    expect(getByRole('button').textContent).toBe('✕');
  });

  it('calls onClick handler', () => {
    const onClick = vi.fn();
    const { getByRole } = render(() => (
      <CloseButton aria-label="close" onClick={onClick} />
    ));
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies disabled attribute', () => {
    const { getByRole } = render(() => (
      <CloseButton aria-label="close" disabled />
    ));
    const btn = getByRole('button') as HTMLButtonElement;
    expect(btn.disabled).toBeTruthy();
    expect(btn.classList.contains('cursor-not-allowed')).toBeTruthy();
  });
});
