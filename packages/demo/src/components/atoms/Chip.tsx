import type { Component, JSX, ParentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Props for the {@link Chip} component. */
export interface ChipProps
  extends Readonly<ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>> {
  /** Whether the chip is disabled. */
  readonly disabled?: boolean | undefined;
}

/**
 * A simple chip component using DaisyUI.
 * @param props The component properties.
 * @returns The chip element.
 */
export const Chip: Component<ChipProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'class', 'disabled']);
  return (
    <span
      class={twMerge(
        'rounded-full badge pr-0 select-none transition-colors duration-1000',
        local.class,
      )}
      classList={{
        'cursor-pointer': !local.disabled,
        'cursor-not-allowed pointer-events-none opacity-50 cursor-default':
          local.disabled,
      }}
      {...others}
    >
      {local.children}
    </span>
  );
};
