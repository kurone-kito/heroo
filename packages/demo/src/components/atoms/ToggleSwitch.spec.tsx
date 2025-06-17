import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { ToggleSwitch } from './ToggleSwitch.js';

afterEach(() => cleanup());

describe('ToggleSwitch', () => {
  it('renders label text', () => {
    const { getByText } = render(() => <ToggleSwitch label="Label" />);
    expect(getByText('Label')).toBeTruthy();
  });

  it('applies container class', () => {
    const { container } = render(() => (
      <ToggleSwitch label="Label" containerClass="wrap" />
    ));
    const wrapper = container.firstChild as HTMLElement | null;
    expect(wrapper?.classList.contains('wrap')).toBeTruthy();
  });

  it('uses checkbox type', () => {
    const { container } = render(() => <ToggleSwitch label="Label" />);
    const input = container.querySelector('input');
    expect(input?.getAttribute('type')).toBe('checkbox');
  });
});
