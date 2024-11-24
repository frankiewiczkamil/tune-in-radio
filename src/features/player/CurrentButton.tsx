import { State, StateType } from './player.ts';
import { playBtn, playBtnInactive } from './buttons/PlayBtn.tsx';
import { pauseBtn } from './buttons/PauseBtn.tsx';

const { idle, failed, playing, paused, loading } = State;

type CurrentButtonProps = {
  state: StateType;
  play: () => void;
  pause: () => void;
};

function isInactive(state: StateType) {
  return state === failed || state === loading || state === idle;
}

export function CurrentButton({ state, play, pause }: Readonly<CurrentButtonProps>) {
  if (isInactive(state)) return <button disabled>{playBtnInactive}</button>;
  else if (state === playing) return <button onClick={pause}>{pauseBtn}</button>;
  else if (state === paused) return <button onClick={play}>{playBtn}</button>;
}
