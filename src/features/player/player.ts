import { useRef, useState } from 'react';

export const State = {
  idle: 'idle',
  playing: 'playing',
  paused: 'paused',
  stopped: 'stopped',
  failed: 'failed',
} as const;
export type StateType = (typeof State)[keyof typeof State];

type Audio = {
  play: () => Promise<void>;
  pause: () => void;
  src: string;
};

export function usePlayer(audio: Audio) {
  const { idle, playing, paused, stopped, failed } = State;
  const audioRef = useRef<Audio>(audio);
  const [state, setState] = useState<StateType>(idle);

  function pause() {
    try {
      audioRef.current.pause();
      setState(paused);
    } catch (error) {
      setState(failed);
      console.error(error);
    }
  }

  function play() {
    audioRef.current
      .play()
      .then(() => setState(playing))
      .catch(() => setState(failed));
  }

  async function changeStation(url: string) {
    try {
      setState(stopped);
      audioRef.current.pause();
      audioRef.current.src = url!;
      await audioRef.current.play();
      setState(playing);
    } catch (error) {
      setState(failed);
      console.error(error);
    }
  }

  function cleanUp() {
    audioRef.current.pause();
    audioRef.current.src = '';
  }

  return { state, pause, play, changeStation, cleanUp };
}
