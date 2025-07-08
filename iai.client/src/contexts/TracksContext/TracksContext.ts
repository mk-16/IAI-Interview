import type { LineString, Polygon } from "ol/geom";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type TracksContextType = { tracks: Track[], setTracks: Dispatch<SetStateAction<Track[]>>, activeTrack: string, setActiveCard: Dispatch<SetStateAction<string>>; };
export type Track = {
    id: string;
    polygons: Polygon[],
    path: LineString;
};


export const TracksContext = createContext<TracksContextType | null>(null);
