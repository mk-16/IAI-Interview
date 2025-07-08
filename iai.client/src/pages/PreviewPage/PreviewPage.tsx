import './PreviewPage.css';
import MapView from "../../features/MapView/MapView";
import VehicleControls from "../../features/VehicleControls/VehicleControls";
import Catalog from '../../features/Catalog/Catalog';

function PreviewPage () {
    return (
        <main>
            <section className="map-section">
                <MapView />
                <VehicleControls />
            </section>
            <section className="catalog-section">
                <Catalog />
            </section>
        </main>
    );
}

export default PreviewPage;