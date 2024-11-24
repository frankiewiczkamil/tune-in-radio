import { State, StateType } from './player.ts';

type MessageByStateProps = {
  state: StateType;
  name: string;
};
const { idle, failed, playing, paused, loading } = State;

export function MessageByState({ state, name }: Readonly<MessageByStateProps>) {
  if (state === idle) return <br />;
  else if (state === failed) return `Could not load: ${name}`;
  else if (state === playing || state === paused) return `Now playing: ${name}`;
  else if (state === loading) return `Loading: ${name}`;
  else return <br />;
}
