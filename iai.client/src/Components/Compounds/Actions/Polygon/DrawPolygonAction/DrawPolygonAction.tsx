import { useState } from "react";

function PolygonActions(props: Props) {

    const [ state, setState ] = useState(false);

    function clickHandler(){
        setState(true);
    }
    return (
        <div className="polygon-actions">
            <button disabled={ state } onClick={ clickHandler }>Create</button>
        </div>
    );
}

export default PolygonActions;