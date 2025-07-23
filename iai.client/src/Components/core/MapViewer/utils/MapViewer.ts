import { Map as OlMap, View } from "ol";
import * as Controls from 'ol/control';
import * as Interactions from 'ol/interaction';
import type { DegreesDecimalCoordinates } from "./types";
import TileLayer from "ol/layer/Tile";
import { Vector, XYZ } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import type Layer from "ol/layer/Layer";
import { initializeLayers } from "./initializers";

const hell= new Interactions.Draw({
    type:"Circle"
})

export default class MapViewer {

    
    
    private viewer = new OlMap({
        layers: [

        ],
        controls: Controls.defaults({ zoom: false, rotate: false }),
        interactions: Interactions.defaults({ doubleClickZoom: false })
            .extend([
                new Interactions.Draw({
                    "type": "Circle"
                    
                }),
            ])

    });

    public setTarget(target: HTMLElement | null) {

    }


    public centerView(coordinates: DegreesDecimalCoordinates) {
        //center: fromLonLat([ -122.82824089398729, 49.842873037394355 ]),
        this.viewer.getView().setCenter(fromLonLat([ coordinates.longitude, coordinates.latitude ]));
    }
}