import { useEffect, useState, type SyntheticEvent } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Switch from './components/Switch/Switch';
import MapView from './features/MapView/MapView';
import VehicleControls from './features/VehicleControls/VehicleControls';

function App () {

    function handler (event: SyntheticEvent) {
        alert('closing');
    }
    return (
        <main>
           <MapView></MapView>
           <VehicleControls></VehicleControls>
        </main>
    );
}

export default App;