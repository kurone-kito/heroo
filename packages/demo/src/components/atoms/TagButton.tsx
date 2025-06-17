import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/** Props for the {@link TagButton} component. */
export type TagButtonProps = Readonly<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>
>;

/**
 * A small button used for tag selection.
 * @param props Component properties.
 * @returns The button element.
 */
export const TagButton: Component<TagButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'disabled']);
  return (
    <button
      class={twMerge('btn btn-outline btn-sm', local.class)}
      classList={{
        'cursor-pointer': !local.disabled,
        'cursor-not-allowed': local.disabled,
      }}
      data-testid="tag-button"
      type="button"
      disabled={local.disabled}
      {...others}
    />
  );
};
