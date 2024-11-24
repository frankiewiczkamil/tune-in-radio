import { useEffect } from 'react';
import { usePlayer } from './player.ts';
import { MessageByState } from './PlayoutMessage.tsx';
import { CurrentButton } from './CurrentButton.tsx';

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
      <div className="flex flex-col content-center items-center">
        <MessageByState state={state} name={name ?? ''} />
        <CurrentButton state={state} play={play} pause={pause} />
      </div>
    </div>
  );
}
