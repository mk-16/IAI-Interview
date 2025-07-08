import type { MapEvent } from "ol";
import { Feature } from "ol";
import type { Coordinate } from "ol/coordinate";
import { type EventsKey } from "ol/events";
import { Polygon, type LineString, type Point } from "ol/geom";
import { Circle } from "ol/geom";
import { unByKey } from "ol/Observable";
import { toLonLat } from "ol/proj";
import type { Vector } from "ol/source";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { ViewContext } from "../../contexts/ViewContext/ViewContext";
import './TrackControls.css';
function TrackControls() {

    const view = useContext(ViewContext);
    const [ isAnimating, setIsAnimating ] = useState(false);

    const [ animationKey, setAnimationKey ] = useState<EventsKey | undefined>(undefined);
    const [ httpMap, setHttpMap ] = useState<Map<Feature, boolean>>(new Map());

    const speed = 35; // in meters/seconds
    let distanceTraveled = 0; // in meters

    useEffect(() => {
        if (isAnimating) {
            const controller = new AbortController();
            const signal = controller.signal;

            const ineterval = setInterval(() => {
                const fovSource = view.getAllLayers().find(layer => layer.getClassName() == "fov-layer")?.getSource() as Vector<Feature<Circle>>;
                const fov = fovSource?.getFeatureById('car-fov')?.getGeometry() as Circle;
                if (fov.getCenter()) {
                    const [ longitude, latitude ] = toLonLat(fov.getCenter());
                    const url = `https://api.open-meteo.com/v1/elevation?latitude=${ latitude }&longitude=${ longitude }`;
                    fetch(url, { signal }).then(response => response.json()).then(results => {
                        fov.set('height', results.elevation[ 0 ]);
                    }).catch(console.log);
                }
            }, 1000);
            return () => {
                clearInterval(ineterval);
                controller.abort();
            };
        }
    }, [ isAnimating ]);


    function playHandler() {
        const carLayer = view.getAllLayers().find(layer => layer.getClassName() == "car-layer");
        const linestringLayer = view.getAllLayers().find(layer => layer.getClassName() == "linestring-layer");
        const fovSource = view.getAllLayers().find(layer => layer.getClassName() == "fov-layer")?.getSource() as Vector<Feature<Circle>>;
        const polygonsSource = view.getAllLayers().find(layer => layer.getClassName() == "polygons-layer")?.getSource() as Vector<Feature<Polygon>>;

        const carSource = carLayer?.getSource() as Vector<Feature<Point>>;
        const linestringSource = linestringLayer?.getSource() as Vector<Feature<LineString>>;
        const fov = fovSource?.getFeatureById('car-fov')?.getGeometry() as Circle;

        let car = carSource?.getFeatureById('car');
        let path = linestringSource?.getFeatures()[ 0 ];
        let lastTime: number | undefined;
        let listenerKey: EventsKey | undefined;

        if (!isAnimating) {
            setIsAnimating(true);
            listenerKey = view.on('postrender', moveIcon);
            setAnimationKey(listenerKey);
            view.render();
        }

        function moveIcon(event: MapEvent) {
            const time = event.frameState?.time!;
            if (lastTime == undefined)
                lastTime = time;
            const elapsedTime = (time - lastTime) / 1000; // in seconds
            lastTime = time;
            distanceTraveled = (distanceTraveled + speed * elapsedTime);

            const totalLength = path?.getGeometry()?.getLength()!;


            const currentDistance = distanceTraveled % totalLength;
            const fraction = currentDistance / totalLength;
            const newCoordinate = path?.getGeometry()?.getCoordinateAt(fraction)!;

            if (distanceTraveled > currentDistance && listenerKey) {
                unByKey(listenerKey);
                setIsAnimating(false);

            }
            else {
                car?.getGeometry()?.setCoordinates(newCoordinate);
                fov?.setCenter(newCoordinate);
            }

            polygonsSource?.getFeatures().forEach(feature => {
                const polygon = feature.getGeometry();
                const extent = polygon?.getExtent()!;
                const height = feature.get('height');

                const centroid = polygon?.getFlatInteriorPoint() as Coordinate; //for dtm
                const [ longitude, latitude ] = toLonLat(centroid);

                if (fov.intersectsExtent(extent)) {
               
                    if (height <= fov.get('height')) {
                        feature.setStyle(new Style({
                            fill: new Fill({ color: 'rgba(66, 195, 52, 0.55)' }),
                            stroke: new Stroke({ color: 'rgba(41, 158, 28, 0.55)' }),
                        }));
                    }
                    else {

                        feature.setStyle(new Style({
                            fill: new Fill({ color: 'rgba(105, 0, 0, 0.73)' }),
                            stroke: new Stroke({ color: 'rgba(76, 0, 0, 0.73)' }),
                        }));
                    }

                } else {
                    feature.setStyle(new Style());
                }

            });

        }
    }
    function resetAnimation() {
        const carSource = view.getAllLayers().find(layer => layer.getClassName() == "car-layer")?.getSource() as Vector<Feature<Point>>;
        const linestringSource = view.getAllLayers().find(layer => layer.getClassName() == "linestring-layer")?.getSource() as Vector<Feature<LineString>>;
        const fovSource = view.getAllLayers().find(layer => layer.getClassName() == "fov-layer")?.getSource() as Vector<Feature<Circle>>;
        const polygonsSource = view.getAllLayers().find(layer => layer.getClassName() == "polygons-layer")?.getSource() as Vector<Feature<Polygon>>;

        const car = carSource?.getFeatureById('car')?.getGeometry();
        const path = linestringSource?.getFeatures()[ 0 ].getGeometry();
        const fov = fovSource?.getFeatureById('car-fov')?.getGeometry();
        polygonsSource?.getFeatures().forEach(feature => {
            feature.setStyle(new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.4)', // Semi-transparent white
                }),
                stroke: new Stroke({
                    color: '#3399CC', // A shade of blue
                    width: 1.25,
                }),

            }));
        });
        if (animationKey) {
            unByKey(animationKey);
        }
        setIsAnimating(false);
        car?.setCoordinates(path?.getCoordinateAt(0)!);
        fov?.setCenter(path?.getCoordinateAt(0)!);
        view.render();
    }

    return (
        <Card>
            <h4>Animation's Actions:</h4>
            <div className="animation-actions">
                <Button clickHandler={ playHandler }>Play</Button>
                <Button clickHandler={ resetAnimation }>Reset</Button>
            </div>
        </Card>
    );
}
export default TrackControls;
