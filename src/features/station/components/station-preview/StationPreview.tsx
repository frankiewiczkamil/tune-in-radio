export type StationPreviewProps = {
  name: string;
  description: string;
  imageUrl: string;
};

export function StationPreview({ name, imageUrl, description }: Readonly<StationPreviewProps>) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <span className="text-3xl">{name}</span>
        <img src={imageUrl} alt={name} className="max-h-20 max-w-20" />
      </div>
      <div className="mt-12">{description}</div>
    </div>
  );
}

export const stationPreviewBlank = <div className="flex justify-center h-full items-center">No station selected yet</div>;
