import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

export function ImageryInitializer(): [ [ string, TileLayer<XYZ> ], [ string, XYZ ] ] {
    const imagerySource = new XYZ({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 18,
        minZoom: 0,
    });

    const imageryLayer = new TileLayer({
        className: 'imagery-layer',
        source: imagerySource
    });

    return [
        [ 'imagery-layer', imageryLayer ],
        [ 'imagery-source', imagerySource ],
    ];
};