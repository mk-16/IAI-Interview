import type { Feature } from "ol";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { ViewContext } from "../../contexts/ViewContext/ViewContext";
import './PolygonControls.css';
import { deletePolygons, drawPolygon, isPolygonGuard } from "./utils/utils";
import { Select } from "ol/interaction";
import type { Polygon } from "ol/geom";
function PolygonControls() {
    const view = useContext(ViewContext);
    const [ drawing, setDrawing ] = useState(false);
    const [ selectedPolygons, setSelectedPolygons ] = useState<Set<Feature<Polygon>>>(new Set());
    const [ polygons, setPolygons ] = useState<Set<Feature<Polygon>>>(new Set());

    useEffect(() => {
        const interaction = view.getInteractions().getArray().find(interation => interation instanceof Select);
        interaction?.on("select", (event) => {
            event.selected.forEach(feature => {
                if (isPolygonGuard(feature))
                    setSelectedPolygons((state) => new Set(state.add(feature)));
            });

            event.deselected.forEach(feature => {
                if (isPolygonGuard(feature))
                    setSelectedPolygons((state) => {
                        state.delete(feature);
                        return new Set(state);
                    });
            });
        });
    }, []);
    useEffect(() => {
        if (drawing) {
            drawPolygon(view).then(feature => {
                setPolygons(state => new Set(state.add(feature)));
                setDrawing(false);
            });
        }
    }, [ drawing ]);


    function handleDelete(all?: boolean) {
        deletePolygons(view, !!all ? polygons : selectedPolygons);
        setPolygons(state => {
            if (all) {
                return new Set();
            }
            else {
                selectedPolygons.forEach(polygon => {
                    state.delete(polygon);
                });
                return new Set(state);
            }
        });

        setSelectedPolygons((state) => {
            //REST
            return new Set();
        });
    }

    function handleSave() {
        alert(polygons.size);//REST
    }

    return (
        <Card>
            <h4>Polygon's Actions:</h4>
            <div className="polygon-actions">
                <Button disabled={ drawing } clickHandler={ () => setDrawing(true) }>Create</Button>
                <Button disabled={ selectedPolygons.size == 0 } clickHandler={ () => handleDelete() }>Delete</Button>
                <Button disabled={ polygons.size == 0 } clickHandler={ () => handleDelete(true) }>Clear All</Button>
                <Button disabled={ polygons.size == 0 } clickHandler={ () => handleSave() }>Save</Button>
            </div>
        </Card>
    );
}

export default PolygonControls;