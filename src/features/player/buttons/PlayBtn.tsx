export const playBtn = <PlayBtn color={'#634FA2'} />;
export const playBtnInactive = <PlayBtn color={'#222'} />;

function PlayBtn({ color }: Readonly<{ color: string }>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}>
      <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
    </svg>
  );
}
