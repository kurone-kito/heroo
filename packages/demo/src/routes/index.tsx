import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { Countdown } from '../components/atoms/Countdown.jsx';
import type { InputChipsApi } from '../components/molecules/InputChips.js';
import { InputChips } from '../components/molecules/InputChips.js';
import { TagTicker } from '../components/molecules/TagTicker.js';
import { useCountdown } from '../hooks/useCountdown.mjs';
import { DEFAULT_COUNTDOWN_MS } from '../utils/constants.mjs';
import { loremWords } from '../utils/words.mjs';

/**
 * The top page.
 * @param props The component props.
 * @returns The component.
 */
const Index: Component<Partial<RouteSectionProps>> = () => {
  const [readonly, setReadonly] = createSignal(false);
  const { timeLeftMs, running, start, reset } = useCountdown({
    durationMs: DEFAULT_COUNTDOWN_MS,
  });
  let api: InputChipsApi | undefined;
  const tags = loremWords();

  const timerClass = () =>
    timeLeftMs() < 3000
      ? 'bg-error text-error-content'
      : 'bg-primary text-primary-content';

  createEffect(() => {
    if (timeLeftMs() === 0 && !running()) {
      api?.blur();
      if ((api?.chips().length ?? 0) <= 1) {
        api?.reset();
        reset();
        start();
      } else {
        setReadonly(true);
      }
    }
  });

  return (
    <div class="flex flex-col items-start gap-4 p-4">
      <Countdown value={timeLeftMs()} class={`${timerClass()} p-2`} />
      <TagTicker
        disabled={readonly()}
        onSelect={(t) => api?.add(t)}
        tags={tags}
      />
      <InputChips
        apiRef={(a: InputChipsApi) => {
          api = a;
        }}
        disabled={readonly()}
        onChange={() => start()}
        onFocus={() => start()}
      />
    </div>
  );
};

export default Index;
