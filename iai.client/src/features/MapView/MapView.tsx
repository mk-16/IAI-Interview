import { Feature, Map, View } from "ol";
import * as Control from "ol/control";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import { Vector, XYZ } from "ol/source";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { useEffect, useRef, useState, type RefObject } from "react";
import './MapView.css';
import Container from "../../components/Container/Container";
import CopyIcon from "../../components/CopyIcon/CopyIcon";
import { ddToDMS } from "./utils/utils";

function MapView () {
    const [ coordinate, setCoordinate ] = useState<{ longitude: string, latitude: string; } | null>(null);
    const [ height, ] = useState<number>(0);
    const containerRef: RefObject<HTMLDivElement | null> = useRef(null);
    const viewerRef: RefObject<null | Map> = useRef(null);
    const [ state, setState ] = useState<Map | null>(null);

    useEffect(() => {
        if (containerRef.current && !viewerRef.current) {
            const iconGeometry = new Point(fromLonLat([ 34.7895211602588, 32.08683899020884 ])); // Replace with your coordinates
            const iconStyle = new Style({
                image: new Icon({
                    anchor: [ .5, .5 ],
                    scale: [ 1, 1 ],
                    //width: 24,
                    //height: 24,
                    //anchorXUnits: 'fraction',
                    //anchorYUnits: 'fraction',
                    src: './src/assets/jeep.png'
                }),
            });

            const iconFeature = new Feature({
                geometry: iconGeometry,
            });

            iconFeature.setStyle(iconStyle);
            const vectorSource = new Vector({
                features: [ iconFeature ],

            });


            const vectorLayer = new VectorLayer({
                //minZoom: 15,
                zIndex: 3,
                source: vectorSource,
            });


            const viewer = new Map({

                target: containerRef.current,
                controls: Control.defaults({
                    zoom: false,
                    rotate: false,
                }),
                layers: [
                    vectorLayer,
                    new TileLayer({
                        source: new XYZ({
                            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                            maxZoom: 18,
                            minZoom: 0,
                        }) // Use OpenStreetMap as the tile source
                    }),
                ],
                view: new View({
                    center: fromLonLat([ 34.7895211602588, 32.08683899020884 ]), // Initial center coordinates (longitude, latitude)
                    zoom: 18, // Initial zoom level
                }),
            });
            setState(viewer);
            viewerRef.current = viewer;
            containerRef?.current.addEventListener('mousemove', (event) => {
                const coordinates = viewer.getEventCoordinateInternal(event) ?? [ 0, 0 ];
                const [ longitude, latitude ] = toLonLat(coordinates);
                setCoordinate({ longitude: ddToDMS(longitude, "longitude"), latitude: ddToDMS(latitude, "latitude") });
            });

        }
        //return () => clearInterval(interval);

    }, [ state, containerRef, viewerRef ]);


    useEffect(() => {
        //const url = `https://api.open-meteo.com/v1/elevation?latitude=${ _coordinate?.latitude ?? 0 }&longitude=${ _coordinate?.longitude ?? 0 }`;
        //const controller = new AbortController();
        //const signal = controller.signal;
        //const timer = setTimeout(() => {
        //    controller.abort();
        //}, 10000);

        //fetch(url, { signal }).then(response => response.json()).then(results => {
        //    setCoordinate(_coordinate);
        //    setHeight(results.elevation[ 0 ]);
        //})
        //.catch(console.log);

        return () => {
            //clearTimeout(timer);
        };
        //}, [ _coordinate ]);
    }, []);
    function copyCoordinate () {
        navigator.clipboard.writeText(`${ coordinate?.latitude } ${ coordinate?.longitude }`);
    }

    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <Container classNames="map-viewer-container" >
            <div className='map-viewer' ref={ containerRef }></div>
            <Container classNames="metadata-container"  setIsHovered={ setIsHovered } handleClick={ copyCoordinate } >
                <CopyIcon isActive={ isHovered } />
                <span>{ coordinate?.latitude ?? ddToDMS(32.08683899020884, "latitude") } </span>
                <span> { coordinate?.longitude ?? ddToDMS(32.08683899020884, "longitude") }</span>
                <span>{ height }m { `\u00B1` }90m</span>
            </Container>
        </Container>
    );
}

export default MapView;



