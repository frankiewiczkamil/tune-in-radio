type PlayerProps = {
  name?: string;
  url?: string;
};

export function Player({ url, name }: Readonly<PlayerProps>) {
  return (
    <div className="flex basis-full justify-center">
      <div className="flex flex-col content-center">
        <div className="flex">{name ? `Playing: ${name}` : <br />}</div>
        <audio>
          <track kind="captions" />
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        &#x23f5; &#x23f8;
      </div>
    </div>
  );
}
