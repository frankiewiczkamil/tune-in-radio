import { StationMetadata } from './StationMetadata.ts';

export async function fetchStations(): Promise<StationMetadata[]> {
  const response = await fetch(import.meta.env.VITE_STATIONS_URL);
  return (await response.json()).data;
}
