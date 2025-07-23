import TileLayer from 'ol/layer/Tile';
import './App.css';
//import PolygonActions from './Components/Compounds/Actions/Polygon/PolygonActions';
import { XYZ } from 'ol/source';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import * as Controls from 'ol/control';
import * as Interactions from 'ol/interaction';
import PolygonActions from './Components/Compounds/Actions/Polygon/PolygonActions';
import MapViewer from './Components/core/MapViewer/MapViewer';
import Card from './Components/core/Card/Card';
function App() {

    return (
        <main>


                <MapViewer />
                <PolygonActions />
        </main>
    );
}

export default App;