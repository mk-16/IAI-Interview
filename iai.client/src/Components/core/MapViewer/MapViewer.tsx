import './MapViewer.css';
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { Source, Vector, XYZ } from "ol/source";
import * as Interactions from "ol/interaction";
import * as Controls from "ol/control";
import { useContext, useEffect, useRef, useState, type RefObject } from "react";
import { Feature, Map as OlMap, View } from "ol";
import type { LineString, Polygon } from 'ol/geom';
import { MapViewContext } from './utils/Contexts/MapViewerContext';
import { PolygonInitializer } from './utils/initializers/PolygonInitializer';
import { ImageryInitializer } from './utils/initializers/ImageryInitializer';
import { CarInitializer } from './utils/initializers/CarInitializer';
import { FovInitializer } from './utils/initializers/fovInitializer';
import { PathInitializer } from './utils/initializers/PathInitializer';
import BaseLayer from 'ol/layer/Base';

function MapViewer() {
    const containerRef: RefObject<HTMLDivElement | null> = useRef(null);
    const [ mapContext, setMapContext ] = useState();
    const [ select, setSelect ] = useState(false);
    const [ drawPolygon, setDrawPolygon ] = useState(false);
    const [ drawPath, setDrawPath ] = useState(false);
    const polygonSource = new Vector<Feature<Polygon>>();
    const pathSource = new Vector<Feature<LineString>>();
    //const pathInteraction = new Interactions.Draw({ type: "LineString", source: pathSource });
    //const polygonInteraction = new Interactions.Draw({ type: "Polygon", source: polygonSource });
    //const selectInteraction = new Interactions.Select({ multi: true });

    //useDrawPolygonEffect(drawPolygon);
    //const pathInteraction = new Interactions.Draw({ type: "LineString" , source: });
    //const polygonInteraction = new Interactions.Draw({ type: "Polygon" });
    //const selectInteraction = new Interactions.Select({multi: true});
    const [ state, setState ] = useState(new Map<string, Source | BaseLayer | Interactions.Draw | Interactions.Select>());

    //const [ selectInteraction, setSelectInteraction ] = useState();
    useEffect(() => {
        const [polygonLayerKP, polygonSourceKP] = PolygonInitializer();
        setState(new Map<string, BaseLayer| Source>([
            ...ImageryInitializer(),
            ...PolygonInitializer(),
            ...PathInitializer(),
            ...CarInitializer(),
            ...FovInitializer(),
        ]));

        return () => { setState(new Map()); };
    }, []);

    useEffect(() => {

        console.log({ state });
    }, [ state ]);

    //useEffect(() => {
    //    pathInteraction.setActive(false);
    //    //polygonInteraction.setActive(tr);
    //    selectInteraction.setActive(false);
    //    console.log(polygonInteraction);
    //    return () => {
    //        pathInteraction.abortDrawing();
    //        polygonInteraction.abortDrawing();
    //        //selectInteraction.getFeatures();

    //        pathInteraction.setActive(false);
    //        polygonInteraction.setActive(false);
    //        selectInteraction.setActive(false);
    //    };
    //}, []);

    //useEffect(() => {
    //    pathInteraction.setActive(false);
    //    polygonInteraction.setActive(false);
    //    selectInteraction.setActive(false);
    //    polygonInteraction.set("hello", "world")
    //    console.log(polygonInteraction)
    //    return () => {
    //        pathInteraction.abortDrawing();
    //        polygonInteraction.abortDrawing();
    //        //selectInteraction.getFeatures();

    //        pathInteraction.setActive(false);
    //        polygonInteraction.setActive(false);
    //        selectInteraction.setActive(false);
    //    };
    //}, []);

    useEffect(() => {
        if (containerRef.current) {
            const tileLayer = new TileLayer({
                source: new XYZ({
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maxZoom: 18,
                    minZoom: 0,

                })
            });
            console.log([ ...state.values() ].filter(kp => kp instanceof BaseLayer))
            const viewer = new OlMap({
                target: containerRef.current,
                layers: [...state.values()].filter(kp => kp instanceof BaseLayer),
                view: new View({
                    center: fromLonLat([ -122.82824089398729, 49.842873037394355 ]),
                    zoom: 0,
                }),
                controls: Controls.defaults({
                    zoom: false,
                    rotate: false,
                }),

                interactions: Interactions.defaults({ doubleClickZoom: false }).extend([
                    //pathInteraction
                ])

            });

            return () => viewer.dispose();
        }

    }, [state]);
    return (
        //<MapViewContext.Provider value={ }>
        <div className='map-viewer' ref={ containerRef }></div>
        // {/*<input onChange={ (event) => setDrawPolygon(!drawPolygon) } type="checkbox" value={ Number(drawPolygon) } />*/}
        //</MapViewContext.Provider>
    );
}

export default MapViewer;