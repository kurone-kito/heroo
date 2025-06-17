import { createRoot } from 'solid-js';
import { expect, it } from 'vitest';
import { useToggle } from './useToggle.mjs';

it('toggles state correctly', () => {
  createRoot((dispose) => {
    const { value, toggle, set } = useToggle({ initial: true });
    expect(value()).toBeTruthy();
    toggle();
    expect(value()).toBe(false);
    set(true);
    expect(value()).toBeTruthy();
    dispose();
  });
});
