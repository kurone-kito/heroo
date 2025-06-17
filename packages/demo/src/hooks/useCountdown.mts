import type { Accessor } from 'solid-js';
import { createSignal, onCleanup } from 'solid-js';
import {
  COUNTDOWN_INTERVAL_MS,
  DEFAULT_COUNTDOWN_MS,
} from '../utils/constants.mjs';

/** Options for {@link useCountdown}. */
export interface UseCountdownOptions {
  /** Countdown duration in milliseconds. */
  readonly durationMs?: number | undefined;
}

/** Return type for {@link useCountdown}. */
export interface UseCountdownReturn {
  /** Remaining time in milliseconds. */
  readonly timeLeftMs: Accessor<number>;

  /** Whether the timer is running. */
  readonly running: Accessor<boolean>;

  /** Starts the countdown. */
  readonly start: Accessor<void>;

  /** Resets the timer and stops counting. */
  readonly reset: Accessor<void>;
}

/**
 * Countdown timer hook.
 * @param options Hook configuration.
 * @returns Timer state and controls.
 */
export const useCountdown = (
  options: Readonly<UseCountdownOptions> = {},
): UseCountdownReturn => {
  const duration = options.durationMs ?? DEFAULT_COUNTDOWN_MS;
  const [timeLeftMs, setTimeLeft] = createSignal(duration);
  const [running, setRunning] = createSignal(false);
  let id: number | undefined;
  let started = 0;

  const stop = () => {
    if (!running()) return;
    clearInterval(id);
    id = undefined;
    setRunning(false);
  };

  const tick = () => {
    const elapsed = Date.now() - started;
    const remain = duration - elapsed;
    if (remain <= 0) {
      setTimeLeft(0);
      stop();
    } else {
      setTimeLeft(remain);
    }
  };

  const start = () => {
    if (running()) return;
    started = Date.now();
    setTimeLeft(duration);
    setRunning(true);
    id = setInterval(tick, COUNTDOWN_INTERVAL_MS) as unknown as number;
  };

  const reset = () => {
    stop();
    setTimeLeft(duration);
  };

  onCleanup(stop);

  return { timeLeftMs, running, start, reset };
};
