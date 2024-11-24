import { StationMetadata } from '../../StationMetadata.ts';

export type StationListProps = {
  stations: StationMetadata[];
  onStationPicked: (id: string) => void;
};

export function StationList({ stations, onStationPicked }: Readonly<StationListProps>) {
  return (
    <div>
      <ul>
        {stations.map(({ id, name }) => (
          <li key={id}>
            <button onClick={(_) => onStationPicked(id)}>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
