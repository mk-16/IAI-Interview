import { Map } from 'ol';
import { defaults } from 'ol/control';
import { type SyntheticEvent } from 'react';
import './App.css';
import Container from './components/Container/Container';
import { ViewContext } from './contexts/ViewContext/ViewContext';
import LineStringControls from './features/LineStringControls/LineStringControls';
import MapView from './features/MapView/MapView';
import PolygonControls from './features/PolygonControls/PolygonControls';
import TrackControls from './features/TrackControls/TrackControls';
import { defaults as defaultInteractions } from 'ol/interaction';

function App() {

    return (
        <ViewContext.Provider value={ new Map({
            controls: defaults({
                zoom: false,
                rotate: false,
            }),
            interactions: defaultInteractions({ doubleClickZoom: false })
        }) }>
            <main>
                <section className="map-section">
                    <MapView />
                </section>
                <section className="tools-panel">
                    <Container classNames="tools-panel-container">
                        <PolygonControls />
                        <LineStringControls />
                        <TrackControls />
                    </Container>
                </section>
            </main>
        </ViewContext.Provider>
    );
}

export default App;