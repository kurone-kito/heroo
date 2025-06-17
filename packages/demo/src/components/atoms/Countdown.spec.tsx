import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Countdown } from './Countdown.js';

afterEach(() => cleanup());

describe('Countdown', () => {
  it('formats milliseconds', () => {
    const { getByTestId } = render(() => <Countdown value={9000} />);
    expect(getByTestId('countdown').textContent).toBe('00:09.0');
  });

  it('accepts custom class', () => {
    const { getByTestId } = render(() => (
      <Countdown value={0} class="custom" />
    ));
    expect(getByTestId('countdown').classList.contains('custom')).toBeTruthy();
  });
});
