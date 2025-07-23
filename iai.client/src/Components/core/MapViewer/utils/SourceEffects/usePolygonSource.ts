import type { Feature } from "ol";
import type { Polygon } from "ol/geom";
import { Vector } from "ol/source";
import { useEffect, useState } from "react";

export function usePolygonSourceEffect() {
    const polygonSource = new Vector<Feature<Polygon>>();
    const polygon
    //const [ polygonSource, setPolygonSource ] = useState(new Vector<Feature<Polygon>>());
    useEffect(() => { 
        //setPolygonSource()
    }, [])
    return polygonSource;
}