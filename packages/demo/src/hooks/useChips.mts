import type { Accessor } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';

/** Options for {@link useChips}. */
export interface UseChipsOptions {
  /** Whether the input is readonly. */
  readonly disabled?: boolean | Accessor<boolean> | undefined;

  /** Initial chip strings. */
  readonly initialChips?: readonly string[] | undefined;

  /** Called when a duplicate value is committed. */
  readonly onDuplicate?: (index: number) => void;
}

/** Return type for {@link useChips}. */
export interface UseChipsReturn {
  /** Add a chip programmatically. */
  readonly addChip: (value: string) => void;

  /** Current chips. */
  readonly chips: Accessor<readonly string[]>;

  /** Chip click handler. */
  readonly handleChipClick: (index: number) => void;

  /** Chip delete handler. */
  readonly handleChipDelete: (index: number) => void;

  /** Input handler. */
  readonly handleInput: (
    e: InputEvent & { currentTarget: HTMLInputElement },
  ) => void;

  /** Keydown handler. */
  readonly handleKeyDown: (
    e: KeyboardEvent & { currentTarget: HTMLInputElement },
  ) => void;

  /** Current input value. */
  readonly inputValue: Accessor<string>;

  /** Resets the chips and input value. */
  readonly reset: Accessor<void>;
}

/**
 * Chip state management hook.
 * @param options Configuration options.
 * @returns Hook handlers and state accessors.
 */
export const useChips = (
  options: Readonly<UseChipsOptions> = {},
): UseChipsReturn => {
  const [chipSet, setChipSet] = createSignal<ReadonlySet<string>>(
    new Set(options.initialChips ?? []),
  );
  const chips = () => Array.from(chipSet());
  const [inputValue, setInputValue] = createSignal('');
  const disabled = () =>
    typeof options.disabled === 'function'
      ? options.disabled()
      : !!options.disabled;

  const commitChip = () => {
    const value = inputValue().trim();
    if (!value) return;
    if (chipSet().has(value)) {
      options.onDuplicate?.(chips().indexOf(value));
      setInputValue('');
      return;
    }
    setChipSet((prev) => new Set([...prev, value]));
    setInputValue('');
  };

  const addChip = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (chipSet().has(trimmed)) {
      options.onDuplicate?.(chips().indexOf(trimmed));
      return;
    }
    setChipSet((prev) => new Set([...prev, trimmed]));
  };

  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    if (disabled()) return;
    setInputValue(e.currentTarget.value);
  };

  const deleteChip = (value: string) =>
    setChipSet((prev) => {
      const next = new Set(prev);
      next.delete(value);
      return next;
    });

  const handleKeyDown = (
    e: KeyboardEvent & { currentTarget: HTMLInputElement },
  ) => {
    if (disabled()) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      commitChip();
    } else if (e.key === 'Backspace' && inputValue() === '') {
      const list = chips();
      const last = list[list.length - 1];
      if (last) {
        deleteChip(last);
        setInputValue(last);
      }
    }
  };

  const deleteChipAt = (index: number) => {
    const list = chips();
    const chip = list[index];
    if (!chip) return;
    deleteChip(chip);
  };

  const handleChipClick = (index: number) => {
    if (disabled()) return;
    const list = chips();
    const chip = list[index];
    if (!chip) return;
    deleteChipAt(index);
    setInputValue(chip);
  };

  const handleChipDelete = (index: number) => {
    if (disabled()) return;
    deleteChipAt(index);
  };

  const reset = () => {
    setChipSet(new Set(options.initialChips ?? []));
    setInputValue('');
  };

  createEffect(() => {
    if (disabled() && inputValue()) {
      setInputValue('');
    }
  });

  return {
    addChip,
    chips,
    handleChipClick,
    handleChipDelete,
    handleInput,
    handleKeyDown,
    inputValue,
    reset,
  };
};
