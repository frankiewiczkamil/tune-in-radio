import { useEffect } from 'react';
import { usePlayer } from './player.ts';

type PlayerProps = {
  name?: string;
  url?: string;
};

export function Player({ url, name }: Readonly<PlayerProps>) {
  const { state, changeStream, pause, play, cleanUp } = usePlayer(new Audio());

  useEffect(function onInit() {
    return cleanUp;
  }, []);

  useEffect(
    function onStationChange() {
      url && changeStream(url);
    },
    [url]
  );

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
