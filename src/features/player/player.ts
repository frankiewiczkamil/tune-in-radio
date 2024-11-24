import { useRef, useState } from 'react';

export const State = {
  idle: 'idle',
  playing: 'playing',
  paused: 'paused',
  loading: 'loading',
  failed: 'failed',
} as const;
export type StateType = (typeof State)[keyof typeof State];

type Audio = {
  play: () => Promise<void>;
  pause: () => void;
  src: string;
};

export function usePlayer() {
  const { idle, playing, paused, loading, failed } = State;
  const audioRef = useRef<Audio>(new Audio());
  const [state, setState] = useState<StateType>(idle);

  function pause() {
    if (state === playing) {
      try {
        audioRef.current.pause();
        setState(paused);
      } catch (error) {
        onError(error);
      }
    } else {
      console.log('Pause can be triggered only in playing state, but received', state);
    }
  }

  function play() {
    if (state === paused) {
      audioRef.current
        .play()
        .then(() => setState(playing))
        .catch(onError);
    } else {
      console.log('Play can be triggered only in paused state, but received', state);
    }
  }

  async function changeStream(url: string) {
    // HTMLAudioElement does not have any mechanism to cancel loading, like AbortController
    // in case of interruptions it raises AbortError, which seems harmless as it gracefully continues working
    // so we allow changing stream in any state, as we want to handle the change immediately

    try {
      setState(loading);
      audioRef.current.pause();
      audioRef.current.src = url!;
      await audioRef.current.play();
      setState(playing);
      console.log('Playing', url);
    } catch (error: unknown) {
      onError(error);
    }
  }

  function cleanUp() {
    audioRef.current.pause();
    audioRef.current.src = '';
  }

  function onError(error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Aborted', error);
    } else {
      setState(failed);
      console.error(error);
    }
  }

  return { state, pause, play, changeStream, cleanUp };
}
