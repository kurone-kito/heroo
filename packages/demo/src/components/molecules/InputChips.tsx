import type { Accessor, Component, JSX } from 'solid-js';
import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useChips } from '../../hooks/useChips.mjs';
import { Chip } from '../atoms/Chip.js';
import { CloseButton } from '../atoms/CloseButton.jsx';

/** Public API for {@link InputChips}. */
export interface InputChipsApi {
  /** Add a chip externally. */
  readonly add: (value: string) => void;

  /** Remove focus from the input. */
  readonly blur: Accessor<void>;

  /** Current chips. */
  readonly chips: Accessor<readonly string[]>;

  /** Reset chips and input value. */
  readonly reset: Accessor<void>;
}

/** Props for {@link InputChips}. */
export interface InputChipsProps {
  /** Whether input is readonly. */
  readonly disabled?: boolean;

  /** Initial chips. */
  readonly initialChips?: readonly string[];

  /** Focus handler for the internal input. */
  readonly onFocus?: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent>;

  /** Called when chips or input value change. */
  readonly onChange?: (chips: readonly string[]) => void;

  /** API reference callback. */
  readonly apiRef?: (api: InputChipsApi) => void;
}

/**
 * Input chips component.
 * @param props The properties.
 * @returns The component.
 */
export const InputChips: Component<InputChipsProps> = (props) => {
  const [highlightIndex, setHighlightIndex] = createSignal<number | null>(null);
  const triggerHighlight = (index: number) => {
    setHighlightIndex(index);
    setTimeout(() => setHighlightIndex(null), 1000);
  };
  const {
    addChip: add,
    chips,
    inputValue,
    handleInput,
    handleKeyDown,
    handleChipClick,
    handleChipDelete,
    reset,
  } = useChips({
    disabled: () => props.disabled ?? false,
    initialChips: props.initialChips,
    onDuplicate: triggerHighlight,
  });
  let inputEl: HTMLInputElement | undefined;
  onMount(() =>
    props.apiRef?.({ add, blur: () => inputEl?.blur(), chips, reset }),
  );
  onCleanup(() => props.apiRef?.({ chips, blur: () => {}, add, reset }));
  createEffect(() => props.onChange?.(chips()));
  createEffect(() => {
    // trigger onChange when input updates
    inputValue();
    props.onChange?.(chips());
  });
  const handleContainerClick: JSX.EventHandlerUnion<HTMLDivElement, Event> = (
    e,
  ) => {
    if (props.disabled) return;
    if (e.currentTarget === e.target) {
      inputEl?.focus();
    }
  };

  const handleContainerKeyDown: JSX.EventHandlerUnion<
    HTMLDivElement,
    KeyboardEvent
  > = (e) => {
    if (e.key === 'Enter') {
      handleContainerClick(e);
    }
  };
  return (
    <div
      class="textarea textarea-bordered flex flex-wrap items-start gap-2 min-h-12 p-2 focus-within:ring-2 focus-within:ring-primary"
      classList={{ 'cursor-not-allowed': props.disabled }}
      data-testid="input-chips"
      onClick={handleContainerClick}
      onKeyDown={handleContainerKeyDown}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: container acts as focus target
      tabIndex={0}
    >
      <For each={chips()}>
        {(chip, i) => (
          <Chip
            class="inline-flex items-center gap-1"
            classList={{
              'badge-warning': highlightIndex() === i(),
              'badge-accent': highlightIndex() !== i(),
            }}
            disabled={props.disabled}
            onClick={
              props.disabled
                ? undefined
                : (e) => {
                    e.stopPropagation();
                    handleChipClick(i());
                  }
            }
          >
            <span
              classList={{
                'cursor-pointer': !props.disabled,
                'cursor-not-allowed': props.disabled,
              }}
            >
              {chip}
            </span>
            <CloseButton
              aria-label={`Remove ${chip}`}
              disabled={props.disabled}
              onClick={
                props.disabled
                  ? undefined
                  : (e) => {
                      e.stopPropagation();
                      handleChipDelete(i());
                    }
              }
            />
          </Chip>
        )}
      </For>
      <input
        class="flex-1 bg-transparent outline-none"
        data-testid="chip-input"
        disabled={props.disabled}
        onFocus={props.onFocus}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        ref={inputEl}
        type="text"
        value={inputValue()}
      />
    </div>
  );
};
