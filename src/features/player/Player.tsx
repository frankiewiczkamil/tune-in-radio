import { useEffect, useRef, useState } from 'react';

type PlayerProps = {
  name?: string;
  url?: string;
};

const State = {
  idle: 'idle',
  playing: 'playing',
  paused: 'paused',
  stopped: 'stopped',
  failed: 'failed',
} as const;
type StateType = (typeof State)[keyof typeof State];

export function Player({ url, name }: Readonly<PlayerProps>) {
  const { idle, playing, paused, stopped, failed } = State;
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [state, setState] = useState<StateType>(idle);

  useEffect(function onInit() {
    return function cleanUp() {
      audioRef.current.pause();
      audioRef.current.src = '';
    };
  }, []);

  useEffect(
    function onStationChange() {
      async function changeStation() {
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

      changeStation();
    },

    [url]
  );

  function pause() {
    try {
      alert('pause');
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

  // todo: prepare player for edge cases (slow network, fast user etc)

  return (
    <div className="flex basis-full justify-center">
      <div className="flex flex-col content-center">
        <div className="flex">{name ? `Playing: ${name}` : <br />}</div>
        {['idle', 'stopped', 'error'].includes(state) && <button disabled>&#x23f5;</button>}
        {state === 'playing' && <button onClick={pause}>&#x23f8;</button>}
        {state === 'paused' && <button onClick={play}>&#x23f5;</button>}
      </div>
    </div>
  );
}
