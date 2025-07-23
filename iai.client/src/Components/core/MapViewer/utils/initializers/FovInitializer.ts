import type { Feature } from "ol";
import type { Circle } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { Vector } from "ol/source";

export function FovInitializer(): [ [ string, VectorLayer<Vector<Feature<Circle>>> ], [ string, Vector<Feature<Circle>> ] ]  {
    const fovSource = new Vector<Feature<Circle>>();
    const fovLayer = new VectorLayer({
        className: 'fov-layer',
        source: fovSource
    });

    return [
        [ 'car-layer', fovLayer ],
        [ 'car-source', fovSource ],
    ];
};