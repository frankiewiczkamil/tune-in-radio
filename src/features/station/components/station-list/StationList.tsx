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
            <button className="p-2 rounded hover:bg-stone-800 w-full text-left" onClick={(_) => onStationPicked(id)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
