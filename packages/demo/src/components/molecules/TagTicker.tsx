import type { Component } from 'solid-js';
import { For, createSignal } from 'solid-js';
import { TagButton } from '../atoms/TagButton.js';

/** Item data for {@link TagTicker}. */
export interface TagTickerItem {
  /** Whether the tag is disabled. */
  readonly disabled: boolean;

  /** Tag label. */
  readonly label: string;

  /** Remove at this iteration count. */
  readonly removeAt?: number;
}

/** Props for {@link TagTicker}. */
export interface TagTickerProps {
  /** Disable all interactions. */
  readonly disabled?: boolean;

  /** Animation duration in seconds. */
  readonly durationSec?: number;

  /** Selection handler. */
  readonly onSelect: (tag: string) => void;

  /** Tags to display. */
  readonly tags: readonly string[];
}

/**
 * Horizontally scrolling ticker of selectable tags.
 * @param props Component props.
 * @returns The component.
 */
export const TagTicker: Component<Readonly<TagTickerProps>> = (props) => {
  const [items, setItems] = createSignal<TagTickerItem[]>(
    props.tags.map((label) => ({ label, disabled: false })),
  );
  const [iteration, setIteration] = createSignal(0);
  const disableItem = (label: string) =>
    setItems((prev) =>
      prev.map((i) =>
        i.label === label
          ? { ...i, disabled: true, removeAt: iteration() + 2 }
          : i,
      ),
    );
  const handleClick = (label: string) => {
    if (props.disabled) return;
    const list = items();
    const item = list.find((i) => i.label === label && !i.disabled);
    if (!item) return;
    props.onSelect(label);
    disableItem(label);
  };
  const handleIteration = () => {
    if (props.disabled) return;
    setIteration((prev) => {
      const next = prev + 1;
      setItems((list) =>
        list.filter((i) => i.removeAt === undefined || i.removeAt > next),
      );
      return next;
    });
  };
  const list = () => {
    const current = items();
    return [...current, ...current];
  };
  const duration = props.durationSec ?? 20;
  return (
    <div class="overflow-hidden whitespace-nowrap">
      <div
        class="flex gap-2 animate-ticker"
        classList={{
          '[animation-play-state:paused]': props.disabled,
          '[animation-play-state:running]': !props.disabled,
        }}
        onAnimationIteration={handleIteration}
        style={{ '--animation-duration': `${duration}s` }}
      >
        <For each={list()}>
          {(item) => (
            <TagButton
              disabled={props.disabled || item.disabled}
              onClick={() => handleClick(item.label)}
            >
              {item.label}
            </TagButton>
          )}
        </For>
      </div>
    </div>
  );
};
