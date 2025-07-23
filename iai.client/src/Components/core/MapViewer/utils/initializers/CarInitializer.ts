import type { Feature } from "ol";
import type { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { Vector } from "ol/source";

export function CarInitializer(): [ [ string, VectorLayer<Vector<Feature<Point>>> ], [ string, Vector<Feature<Point>> ] ] {
    const carSource = new Vector<Feature<Point>>();
    const carLayer = new VectorLayer({
        className: 'car-layer',
        source: carSource
    });

    return [
        [ 'car-layer', carLayer ],
        [ 'car-source', carSource ],
    ];
};