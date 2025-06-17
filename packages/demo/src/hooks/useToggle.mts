import { createSignal } from 'solid-js';

/** Options for {@link useToggle}. */
export interface UseToggleOptions {
  /** Initial boolean value. */
  readonly initial?: boolean | undefined;
}

/** Return type for {@link useToggle}. */
export interface UseToggleReturn {
  /** Current boolean value. */
  readonly value: () => boolean;

  /** Switches the boolean state. */
  readonly toggle: () => void;

  /** Sets the boolean state. */
  readonly set: (next: boolean) => void;
}

/**
 * Manage a boolean toggle state.
 * @param options Configuration options.
 * @returns State accessors and mutators.
 */
export const useToggle = (
  options: Readonly<UseToggleOptions> = {},
): UseToggleReturn => {
  const [value, setValue] = createSignal(options.initial ?? false);
  const toggle = () => setValue((v) => !v);
  const set = (next: boolean) => setValue(next);
  return { value, toggle, set };
};
