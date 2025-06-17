import { createRoot } from 'solid-js';
import { expect, it, vi } from 'vitest';
import { useCountdown } from './useCountdown.mjs';

it('counts down correctly', () => {
  vi.useFakeTimers();
  createRoot((dispose) => {
    const { timeLeftMs, start } = useCountdown({ durationMs: 1000 });
    start();
    expect(timeLeftMs()).toBe(1000);
    vi.advanceTimersByTime(500);
    expect(timeLeftMs()).toBeLessThan(1000);
    vi.advanceTimersByTime(600);
    expect(timeLeftMs()).toBe(0);
    dispose();
  });
  vi.useRealTimers();
});
