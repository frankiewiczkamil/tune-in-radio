import { StationList } from '../features/station/components/station-list/StationList.tsx';
import { StationPreview, stationPreviewBlank } from '../features/station/components/station-preview/StationPreview.tsx';
import { useEffect, useState } from 'react';
import { StationMetadata } from '../features/station/StationMetadata.ts';
import { fetchStations } from '../features/station/stationsClient.ts';
import { Player } from '../features/player/Player.tsx';

export function Stations() {
  const [selectedStationId, setSelectedStationId] = useState<string | undefined>();
  const [stations, setStations] = useState<StationMetadata[]>([]);

  useEffect(() => {
    fetchStations().then((stations) => {
      setStations(stations);
    });
  }, []);
  const selectedStation = stations.find(({ id }) => id === selectedStationId);
  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-row flex-1 overflow-hidden">
        <nav className="m-2 min-w-72 p-2 overflow-y-auto rounded bg-stone-900">
          <StationList stations={stations} onStationPicked={setSelectedStationId} />
        </nav>
        <article className="flex-1 p-2 overflow-y-auto rounded my-2 mr-2 bg-stone-900">
          {selectedStation ? (
            <StationPreview name={selectedStation.name} description={selectedStation.description} imageUrl={selectedStation.imgUrl} />
          ) : (
            stationPreviewBlank
          )}
        </article>
      </div>
      <div className="">
        <Player name={selectedStation?.name} url={selectedStation?.streamUrl} />
      </div>
    </main>
  );
}
