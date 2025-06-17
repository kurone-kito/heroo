import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TagTicker } from './TagTicker.js';

afterEach(() => cleanup());

describe('TagTicker', () => {
  it('applies button styles', () => {
    const { getAllByText } = render(() => (
      <TagTicker tags={['foo']} onSelect={() => {}} />
    ));
    expect(getAllByText('foo')[0]?.classList.contains('btn')).toBeTruthy();
  });

  it('ignores clicks when disabled', () => {
    const handler = vi.fn();
    const { getAllByText } = render(() => (
      <TagTicker tags={['foo']} onSelect={handler} disabled />
    ));
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    fireEvent.click(getAllByText('foo')[0]!);
    expect(handler).not.toHaveBeenCalled();
  });

  it('removes disabled tags after leaving', () => {
    const { container, getAllByText, queryAllByText } = render(() => (
      <TagTicker tags={['foo']} onSelect={() => {}} durationSec={0.1} />
    ));
    // biome-ignore lint/style/noNonNullAssertion: test element existence
    const ticker = container.querySelector('.animate-ticker')!;
    // biome-ignore lint/style/noNonNullAssertion: test element existence
    fireEvent.click(getAllByText('foo')[0]!);
    fireEvent.animationIteration(ticker);
    expect(queryAllByText('foo').length).toBeGreaterThan(0);
    fireEvent.animationIteration(ticker);
    expect(queryAllByText('foo')).toHaveLength(0);
  });

  it('pauses animation when disabled', () => {
    const { container } = render(() => (
      <TagTicker tags={['foo']} onSelect={() => {}} disabled />
    ));
    const ticker = container.querySelector('.animate-ticker') as HTMLElement;
    expect(ticker.style.animationPlayState).toBe('paused');
  });
});
