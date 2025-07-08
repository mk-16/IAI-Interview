
import { Feature, type Map } from "ol";
import { noModifierKeys, primaryAction } from "ol/events/condition";
import { Circle, Point, type LineString } from "ol/geom";
import Draw from "ol/interaction/Draw";
import { Vector } from "ol/source";
import VectorSource from "ol/source/Vector";


export function isLineStringGuard(feature: Feature): feature is Feature<LineString> {
    return feature.getGeometry()?.getType() == 'LineString';
}
export function drawLinestring(view: Map): Promise<Feature> {
    const linestringSource = view.getAllLayers().find(layer => layer.getClassName() == 'linestring-layer')?.getSource() as VectorSource;
    const carSource = view.getAllLayers().find(layer => layer.getClassName() == 'car-layer')?.getSource() as VectorSource;
    const fovSource = view.getAllLayers().find(layer => layer.getClassName() == 'fov-layer')?.getSource() as VectorSource;

    return new Promise((resolve) => {
        const drawInteraction = new Draw(({
            condition: (e) => noModifierKeys(e) && primaryAction(e) && e.originalEvent instanceof PointerEvent && e.originalEvent.button !== 2,
            source: linestringSource,
            type: "LineString",
            minPoints: 2,
            //''
        }));

        view.addInteraction(drawInteraction);
        view.once('dblclick', () => {
            drawInteraction.finishDrawing();
            view.removeInteraction(drawInteraction);
        });

        drawInteraction.once('drawstart', function (event) {
            console.log({ event });
            const coordinate = (event.target as Draw)[ 'finishCoordinate_' ];
            const carPoint = new Point(coordinate); // Replace with your coordinates
            const carFoV = new Circle(coordinate, 100); // Replace with your coordinates
            const carFoVFeature = new Feature<Circle>({
                geometry: carFoV
            });
            const carFeature = new Feature({
                geometry: carPoint,
            });
            carFoVFeature.setId('car-fov');
            carFeature.setId('car');
            fovSource.addFeature(carFoVFeature);
            carSource.addFeature(carFeature);
        });

        drawInteraction.on('change:active', () => {console.log("FIRED:CHANGE:ACTIVE") })
        drawInteraction.on('change', () => {console.log("FIRED:CHANGE:ACTIVE") })
        drawInteraction.on('drawabort', () => {console.log("FIRED:CHANGE:ABORT") })

        drawInteraction?.once('drawend', async function (event) {
            drawInteraction.finishDrawing();
            view.removeInteraction(drawInteraction);
            const feature = event.feature as Feature<LineString>;
            const controller = new AbortController();
            const signal = controller.signal;
            const results = await fetch("/api/route", {
                signal,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    coordinates: feature.getGeometry()?.getCoordinates()
                })
            }).then(response => response.json());
            feature.setId(results.id);
            resolve(feature);
        });

    });

}

export async function deleteLinestrings(view: Map) {
    const linestringsLayer = view.getAllLayers().find(layer => layer.getClassName() == "linestring-layer");
    const carLayer = view.getAllLayers().find(layer => layer.getClassName() == "car-layer");
    const fovSource = view.getAllLayers().find(layer => layer.getClassName() == 'fov-layer')?.getSource() as VectorSource;

    const linestringsSource = linestringsLayer?.getSource() as Vector<Feature<LineString>>;
    const carSource = carLayer?.getSource() as Vector;
    const featureID = linestringsSource.getFeatures()[ 0 ].getId();
    const controller = new AbortController();
    const signal = controller.signal;
    const results = await fetch("/api/route", {
        signal,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify([ featureID ])
    }).then(response => response.json());
    if (results.deletedCount > 0) {
        linestringsSource?.clear();
        carSource?.clear();
        fovSource.clear();
    }

}