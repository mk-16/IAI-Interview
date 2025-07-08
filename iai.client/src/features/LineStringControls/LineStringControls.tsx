import type { Feature } from "ol";
import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { ViewContext } from "../../contexts/ViewContext/ViewContext";
import './LineStringControls.css';
import { deleteLinestrings, drawLinestring } from "./utils/utils";
function LineStringControls() {
    const view = useContext(ViewContext);
    const [ drawing, setDrawing ] = useState(false);
    const [ linestrings, setLinestrings ] = useState<Set<Feature>>(new Set());

    useEffect(() => {
        if (drawing) {
            drawLinestring(view).then(feature => {
                setLinestrings(state => new Set(state.add(feature)));
                setDrawing(false);
            });
        }
    }, [ drawing ]);


    function handleDelete() {
        deleteLinestrings(view);
        setLinestrings(new Set());
    }

    function handleSave() {
        alert(linestrings.size);//REST
    }

    return (
        <Card>
            <h4>Path's Actions:</h4>
            <div className="linestring-actions">
                <Button disabled={ linestrings.size > 0 || drawing } clickHandler={ () => setDrawing(true) }>Create</Button>
                <Button disabled={ linestrings.size == 0 }  clickHandler={ () => handleDelete() }>Delete</Button>
                <Button disabled={ linestrings.size == 0 }  clickHandler={ () => handleSave() }>Save</Button>
            </div>
        </Card>
    );
}

export default LineStringControls;