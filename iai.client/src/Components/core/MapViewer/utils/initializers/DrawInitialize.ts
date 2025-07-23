import type { Feature } from "ol";
import type { Point } from "ol/geom";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import { Source, Vector } from "ol/source";

export function CarInitializer(source: Source): [ [ string, VectorLayer<Vector<Feature<Point>>> ], [ string, Vector<Feature<Point>> ] ] {
    const draw = new Draw({type: "Polygon", source});
    draw.
    const carLayer = new VectorLayer({
        className: 'car-layer',
        source: carSource
    });

    return [
        [ 'car-layer', carLayer ],
        [ 'car-source', carSource ],
    ];
};