import type { Component, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import type { Except } from 'type-fest';

/** Props for {@link ToggleSwitch}. */
export interface ToggleSwitchProps
  extends Readonly<Except<JSX.InputHTMLAttributes<HTMLInputElement>, 'type'>> {
  /** Label text for the switch. */
  readonly label: string;

  /** Additional class for the wrapper label element. */
  readonly containerClass?: string | undefined;
}

/**
 * DaisyUI toggle switch with label.
 * @param props The component properties.
 * @returns The rendered element.
 */
export const ToggleSwitch: Component<Readonly<ToggleSwitchProps>> = (props) => {
  const [local, others] = splitProps(props, [
    'label',
    'class',
    'containerClass',
  ]);
  return (
    <label class={twMerge('label cursor-pointer gap-2', local.containerClass)}>
      <span class="label-text">{local.label}</span>
      <input
        {...others}
        type="checkbox"
        class={twMerge('toggle', local.class)}
      />
    </label>
  );
};
