import { createRoot, createSignal } from 'solid-js';
import { expect, it } from 'vitest';
import { useChips } from './useChips.mjs';

it('manages chip state', () => {
  createRoot((dispose) => {
    const { chips, inputValue, handleInput, handleKeyDown, handleChipDelete } =
      useChips();
    handleInput({ currentTarget: { value: 'foo' } } as unknown as InputEvent & {
      currentTarget: HTMLInputElement;
    });
    handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
      currentTarget: document.createElement('input'),
    } as unknown as KeyboardEvent & { currentTarget: HTMLInputElement });
    expect(chips()).toEqual(['foo']);

    handleKeyDown({
      key: 'Backspace',
      preventDefault: () => {},
      currentTarget: document.createElement('input'),
    } as unknown as KeyboardEvent & { currentTarget: HTMLInputElement });
    expect(inputValue()).toBe('foo');
    handleChipDelete(0);
    expect(chips()).toEqual([]);
    dispose();
  });
});

it('ignores actions when disabled', () => {
  createRoot((dispose) => {
    const disabled = () => true;
    const {
      chips,
      handleInput,
      handleKeyDown,
      handleChipClick,
      handleChipDelete,
      reset,
    } = useChips({ disabled, initialChips: ['foo'] });
    handleInput({ currentTarget: { value: 'bar' } } as unknown as InputEvent & {
      currentTarget: HTMLInputElement;
    });
    handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
      currentTarget: document.createElement('input'),
    } as unknown as KeyboardEvent & { currentTarget: HTMLInputElement });
    expect(chips()).toEqual(['foo']);
    handleChipClick(0);
    handleChipDelete(0);
    expect(chips()).toEqual(['foo']);
    reset();
    expect(chips()).toEqual(['foo']);
    dispose();
  });
});

it('resets state', () => {
  createRoot((dispose) => {
    const { chips, handleInput, handleKeyDown, reset } = useChips({
      initialChips: ['foo'],
    });
    handleInput({ currentTarget: { value: 'bar' } } as unknown as InputEvent & {
      currentTarget: HTMLInputElement;
    });
    handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
      currentTarget: document.createElement('input'),
    } as unknown as KeyboardEvent & { currentTarget: HTMLInputElement });
    expect(chips()).toEqual(['foo', 'bar']);
    reset();
    expect(chips()).toEqual(['foo']);
    dispose();
  });
});

it('handles duplicate chips', () => {
  createRoot((dispose) => {
    let dupIndex: number | null = null;
    const { chips, handleInput, handleKeyDown } = useChips({
      initialChips: ['foo'],
      onDuplicate: (i) => {
        dupIndex = i;
      },
    });
    handleInput({ currentTarget: { value: 'foo' } } as unknown as InputEvent & {
      currentTarget: HTMLInputElement;
    });
    handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
      currentTarget: document.createElement('input'),
    } as unknown as KeyboardEvent & { currentTarget: HTMLInputElement });
    expect(chips()).toEqual(['foo']);
    expect(dupIndex).toBe(0);
    dispose();
  });
});

it('clears input when disabled toggles', async () =>
  new Promise<void>((resolve) => {
    createRoot((dispose) => {
      const [disabled, setDisabled] = createSignal(false);
      const { inputValue, handleInput } = useChips({ disabled });
      handleInput({
        currentTarget: { value: 'foo' },
      } as unknown as InputEvent & {
        currentTarget: HTMLInputElement;
      });
      expect(inputValue()).toBe('foo');
      setDisabled(true);
      queueMicrotask(() => {
        expect(inputValue()).toBe('');
        dispose();
        resolve();
      });
    });
  }));
