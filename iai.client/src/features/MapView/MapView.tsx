import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { Vector, XYZ } from "ol/source";
import Fill from "ol/style/Fill";
import Icon from "ol/style/Icon";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { useContext, useEffect, useRef, type RefObject } from "react";
import Container from "../../components/Container/Container";
import { ViewContext } from "../../contexts/ViewContext/ViewContext";
import './MapView.css';
import { useSelect } from "./utils/utils";
function MapView() {
    const view = useContext(ViewContext);
    const containerRef: RefObject<HTMLDivElement | null> = useRef(null);
    const viewerRef: RefObject<null | Map> = useRef(null);
    useSelect(view);
    useEffect(() => {
        if (containerRef.current && !viewerRef.current) {
            const iconStyle = new Style({
                image: new Icon({
                    anchor: [ .5, .5 ],
                    scale: [ 1, 1 ],
                    src: './src/assets/jeep_lb.png',
                }),
            });

            const fillStyle = new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            });

            const strokeStyle = new Stroke({
                color: '#ffcc33',
                width: 2
            });

            const fovLayer = new VectorLayer({
                className: 'fov-layer',
                zIndex: 3,
                source: new Vector(),

                style: new Style({
                    stroke: strokeStyle,
                    fill: fillStyle,
                }),
            });
            const carLayer = new VectorLayer({
                className: 'car-layer',
                zIndex: 4,
                style: iconStyle,
                source: new Vector(),
            });
            const polygonsLayer = new VectorLayer({
                className: 'polygons-layer',
                zIndex: 1,
                source: new Vector(),
            });

            const linestringsLayer = new VectorLayer({
                className: 'linestring-layer',
                zIndex: 2,
                style: new Style({
                    stroke: new Stroke({
                        width: 6, // Set the desired line width in pixels
                        color: 'yellow',
                        lineDash: [ 10, 40 ] //or other combinations
                    })
                }),
                source: new Vector(),
            });

            const tileLayer = new TileLayer({
                source: new XYZ({
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maxZoom: 18,
                    minZoom: 0,
                })
            });

            view.setTarget(containerRef.current);
            view.setLayers([ polygonsLayer, linestringsLayer, fovLayer, carLayer, tileLayer ]);
            view.setView(new View({
                center: fromLonLat([ -122.82824089398729, 49.842873037394355 ]),
                zoom: 18, 
            }));
        }
    }, [ containerRef, viewerRef ]);

    return (
        <Container classNames="map-viewer-container" >
            <div className='map-viewer' ref={ containerRef }></div>
        </Container>
    );
}

export default MapView;



