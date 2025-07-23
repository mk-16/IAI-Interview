import { Collection, Feature } from "ol";
import type { Circle, LineString, Point, Polygon } from "ol/geom";
import type Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { Vector, XYZ } from "ol/source";

export function initializeLayers(): [string, Layer][] {
    const map = new Map();
    return [
        [
            "imagery-layer",
            new TileLayer({
                className: 'imagery-layer',
                source: new XYZ({
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maxZoom: 18,
                    minZoom: 0,

                })
            })
        ],
        [
            "polygon-layer",
            new VectorLayer({
                className: 'polygon-layer',
                source: new Vector({
                    features: new Collection<Feature<Polygon>>()
                })
            })
        ],
        [
            "path-layer",
            new VectorLayer({
                className: 'path-layer',
                source: new Vector({
                    features: new Collection<Feature<LineString>>()
                })
            })
        ],
        [
            "car-layer",
            new VectorLayer({
                className: 'car-layer',
                source: new Vector({
                    features: new Collection<Feature<Point>>()
                })
            })
        ],
        [
            "fov-layer",
            new VectorLayer({
                className: 'fov-layer',
                source: new Vector({
                    features: new Collection<Feature<Circle>>()
                })
            })
        ],
    ]
}
