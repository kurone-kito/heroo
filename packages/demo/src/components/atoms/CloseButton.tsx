import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the {@link CloseButton} component.
 */
export type CloseButtonProps = Readonly<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>
>;

/**
 * A small circular button showing a cross icon.
 * @param props The component properties.
 * @returns The button element.
 */
export const CloseButton: Component<CloseButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'disabled']);
  return (
    <button
      class={twMerge('btn btn-accent btn-xs btn-circle btn-ghost', local.class)}
      classList={{
        'cursor-pointer': !props.disabled,
        'cursor-not-allowed': props.disabled,
      }}
      disabled={local.disabled}
      type="button"
      {...others}
    >
      ✕
    </button>
  );
};
