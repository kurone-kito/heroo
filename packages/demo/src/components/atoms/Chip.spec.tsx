import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Chip } from './Chip.js';

afterEach(() => cleanup());

describe('Chip', () => {
  it('renders content', () => {
    const { getByText } = render(() => <Chip>foo</Chip>);
    expect(getByText('foo')).toBeTruthy();
  });

  it('applies additional class', () => {
    const { getByText } = render(() => <Chip class="test-class">bar</Chip>);
    const span = getByText('bar').closest('span');
    expect(span).not.toBeNull();
    expect(span?.classList.contains('test-class')).toBeTruthy();
  });

  it('shows disabled styles', () => {
    const { getByText } = render(() => <Chip disabled>baz</Chip>);
    const span = getByText('baz').closest('span');
    expect(span).not.toBeNull();
    expect(span?.classList.contains('cursor-not-allowed')).toBeTruthy();
  });
});
