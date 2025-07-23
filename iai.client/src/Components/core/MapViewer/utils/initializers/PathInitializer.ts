import type { Feature } from "ol";
import type { LineString } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { Vector } from "ol/source";

export function PathInitializer(): [ [ string, VectorLayer<Vector<Feature<LineString>>> ], [ string, Vector<Feature<LineString>> ] ] {
    const pathSource = new Vector<Feature<LineString>>();
    const pathLayer = new VectorLayer({
        className: 'path-layer',
        source: pathSource
    });

    return [
        [ 'path-layer', pathLayer ],
        [ 'path-source', pathSource ],
    ];
};