import { StateType } from './player.ts';
import { MessageByState } from './PlayoutMessage.tsx';
import { CurrentButton } from './CurrentButton.tsx';

type PlayerProps = {
  name?: string;
  state: StateType;
  play: () => void;
  pause: () => void;
};

export function Player({ name, pause, play, state }: Readonly<PlayerProps>) {
  return (
    <div className="flex basis-full justify-center">
      <div className="flex flex-col content-center items-center">
        <MessageByState state={state} name={name ?? ''} />
        <CurrentButton state={state} play={play} pause={pause} />
      </div>
    </div>
  );
}
