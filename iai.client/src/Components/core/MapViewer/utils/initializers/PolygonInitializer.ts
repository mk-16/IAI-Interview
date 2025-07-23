import type { Feature } from "ol";
import type { Polygon } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { Vector } from "ol/source";

export function PolygonInitializer(): [ [ string, VectorLayer<Vector<Feature<Polygon>>> ], [ string, Vector<Feature<Polygon>> ] ] {
    const polygonSource = new Vector<Feature<Polygon>>();
    const polygonLayer = new VectorLayer({
        className: 'polygon-layer',
        source: polygonSource
    });

    return [
        [ 'polygon-layer', polygonLayer],
        [ 'polygon-source', polygonSource],
    ]
};