
import type { Feature, Map } from "ol";
import type { Coordinate } from "ol/coordinate";
import { click, noModifierKeys, primaryAction } from "ol/events/condition";
import type { Geometry, Polygon } from "ol/geom";
import Draw from "ol/interaction/Draw";
import { toLonLat } from "ol/proj";
import { Vector } from "ol/source";
import VectorSource from "ol/source/Vector";


export function isPolygonGuard(feature: Feature): feature is Feature<Polygon> {
    return feature.getGeometry()?.getType() == 'Polygon';
}
export async function drawPolygon(view: Map) {
    const source = view.getAllLayers().find(layer => layer.getClassName() == 'polygons-layer')?.getSource() as VectorSource;
    const drawInteraction = new Draw(({
        source,
        condition: (e) => noModifierKeys(e) && primaryAction(e) && e.originalEvent instanceof PointerEvent && e.originalEvent.button !== 2,
        type: "Polygon",
        minPoints: 3,
    }));

    view.addInteraction(drawInteraction);
    view.once('dblclick', () => {
        drawInteraction.finishDrawing();
        view.removeInteraction(drawInteraction);
    });

    const promise = new Promise<Feature<Polygon>>(resolve => {
        drawInteraction?.once('drawend', function (event) {
            drawInteraction.finishDrawing();
            view.removeInteraction(drawInteraction);
            const feature = event.feature as Feature<Polygon>;
            const polygon = feature.getGeometry() as Polygon;
            const centroid = polygon?.getFlatInteriorPoint() as Coordinate; //for dtm
            const [ longitude, latitude ] = toLonLat(centroid);
            const url = `https://api.open-meteo.com/v1/elevation?latitude=${ latitude }&longitude=${ longitude }`;
            const controller = new AbortController();
            const signal = controller.signal;
            fetch(url, { signal })
                .then(response => response.json())
                .then(results => {
                    const height = results.elevation[ 0 ];
                    feature.set("height", height);
                    resolve(feature);
                });
        });
    });
    const controller = new AbortController();
    const signal = controller.signal;
    const feature = await promise;
    const coordinates = feature.getGeometry()?.getCoordinates()[ 0 ];
    const featureID: {id:string} = await fetch("/api/polygon", {
        signal,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            coordinates,
            height: feature.get("height")
        })
    }).then(response => response.json());
    feature.setId(featureID.id);
    return feature;
}

export async function deletePolygons(view: Map, polygons: Set<Feature<Polygon>>) {
    const polygonsLayer = view.getAllLayers().find(layer => layer.getClassName() == "polygons-layer");
    const source = polygonsLayer?.getSource() as Vector<Feature<Polygon>>;
    source?.removeFeatures([ ...polygons ]);

    const controller = new AbortController();
    const signal = controller.signal;
    const results = await fetch("/api/polygons", {
        signal,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify([ ...polygons ].map(feature => feature.getId()))    
    }).then(response => response.json());
    if (results.deletedCount > 0) {
        source?.removeFeatures([ ...polygons ]);
    }
}