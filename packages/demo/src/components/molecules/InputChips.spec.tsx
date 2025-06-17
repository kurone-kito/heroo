import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { InputChipsApi } from './InputChips.js';
import { InputChips } from './InputChips.js';

afterEach(() => cleanup());

describe('InputChips', () => {
  it('adds disabled styles when disabled', () => {
    const { getByTestId } = render(() => <InputChips disabled />);
    expect(
      getByTestId('input-chips').classList.contains('cursor-not-allowed'),
    ).toBeTruthy();
  });

  it('clears input when disabled toggles', () => {
    const [disabled, setDisabled] = createSignal(false);
    const { getByTestId } = render(() => <InputChips disabled={disabled()} />);
    const input = getByTestId('chip-input') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'foo' } });
    setDisabled(true);
    expect(input.value).toBe('');
  });

  it('adds chip on Enter key', () => {
    const { getByTestId, getByText } = render(() => <InputChips />);
    const input = getByTestId('chip-input') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'foo' } });
    fireEvent.keyDown(input, { key: 'Enter', preventDefault: () => {} });
    expect(getByText('foo')).toBeDefined();
    expect(input.value).toBe('');
  });

  it('removes chip via close button', () => {
    const { getByLabelText, queryByText } = render(() => (
      <InputChips initialChips={['foo']} />
    ));
    fireEvent.click(getByLabelText('Remove foo'));
    expect(queryByText('foo')).toBeNull();
  });

  it('highlights duplicate chip', () => {
    vi.useFakeTimers();
    const { getByTestId, getByText } = render(() => (
      <InputChips initialChips={['foo']} />
    ));
    const input = getByTestId('chip-input') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'foo' } });
    fireEvent.keyDown(input, { key: 'Enter', preventDefault: () => {} });
    const chip = getByText('foo').parentElement as HTMLElement;
    expect(chip.classList.contains('badge-warning')).toBeTruthy();
    vi.advanceTimersByTime(1000);
    expect(chip.classList.contains('badge-warning')).toBe(false);
    vi.useRealTimers();
  });

  it('focuses input when container clicked', () => {
    const { getByTestId } = render(() => <InputChips />);
    const container = getByTestId('input-chips');
    fireEvent.click(container);
    const input = getByTestId('chip-input') as HTMLInputElement;
    expect(document.activeElement).toBe(input);
  });

  it('supports adding via api', () => {
    let api: InputChipsApi | undefined;
    const storeApi = (a: InputChipsApi) => {
      api = a;
    };
    const { getByText } = render(() => <InputChips apiRef={storeApi} />);
    api?.add('bar');
    expect(getByText('bar')).toBeDefined();
  });

  it('calls onChange when value updates', () => {
    const handler = vi.fn();
    const { getByTestId } = render(() => <InputChips onChange={handler} />);
    const input = getByTestId('chip-input') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'foo' } });
    expect(handler).toHaveBeenCalled();
    handler.mockClear();
    fireEvent.keyDown(input, { key: 'Enter', preventDefault: () => {} });
    expect(handler).toHaveBeenCalled();
  });
});
