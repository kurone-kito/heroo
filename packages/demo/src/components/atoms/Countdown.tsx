import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Props for the {@link Countdown} component. */
export interface CountdownProps
  extends Readonly<JSX.HTMLAttributes<HTMLSpanElement>> {
  /** Remaining time in milliseconds. */
  readonly value: number;
}

/**
 * Format milliseconds to mm:ss.s format.
 * @param ms The time in milliseconds to format.
 * @returns Formatted time string in mm:ss.s format.
 */
const format = (ms: number) => {
  const totalSec = Math.ceil(ms / 100) / 10; // precision 0.1s
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toFixed(1)
    .padStart(4, '0')}`;
};

/**
 * Display countdown time in mm:ss.s format.
 * @param props The component props.
 * @returns The rendered element.
 */
export const Countdown: Component<Readonly<CountdownProps>> = (props) => {
  const [local, others] = splitProps(props, ['value', 'class']);
  return (
    <span
      class={twMerge('font-mono text-xl', local.class)}
      {...others}
      data-testid="countdown"
    >
      {format(local.value)}
    </span>
  );
};
