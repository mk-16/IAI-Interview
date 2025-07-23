import { useState } from 'react';
import Card from '../../../core/Card/Card';
import './PolygonActions.css'
function PolygonActions() {

    const [ state, setState ] = useState(false);
    function clickHandler() {
        setState(true);
    }
  return (
    <Card>
          <h4>Polygon's Actions:</h4>
          <div className="polygon-actions">
              <button disabled={ state } onClick={ clickHandler }>Create</button>
              {/*<button disabled={ selectedPolygons.size == 0 } clickHandler={ () => handleDelete() }>Delete</button>*/}
              {/*<button disabled={ polygons.size == 0 } clickHandler={ () => handleDelete(true) }>Clear All</button>*/}
              {/*<button disabled={ polygons.size == 0 } clickHandler={ () => handleSave() }>Save</button>*/}
          </div>
    </Card>
  );
}

export default PolygonActions;