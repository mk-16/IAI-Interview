import { useState } from 'react';
import './VehicleControls.css';
import Container from '../../components/Container/Container';
import CopyIcon from '../../components/CopyIcon/CopyIcon';
function VehicleControls () {
    function copyCoordinate () {
        const coordinate = { latitude: 0, longitude: 0 };
        navigator.clipboard.writeText(`${ coordinate?.latitude } ${ coordinate?.longitude }`);
    }
    const [ speed, setSpeed ] = useState<string>('20');
    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <Container classNames='vehicle-config'>
            <h3 style={{margin: 0}}>Jeep Config Panel:</h3>
            <div>
                <div>
                    <div
                        className="vehicle-coordiante"
                        onClick={ copyCoordinate } 
                        onMouseEnter={ () => setIsHovered(true) }
                        onMouseLeave={ () => setIsHovered(false) }
                    >
                        <CopyIcon isActive={ isHovered } />
                        <h5>Current Coordiantes:</h5>
                        <span className="vehicle-latitude">{ `N 00\u00B0 00' 00.00"` }</span>
                        <span className="vehicle-longitude">{ `E 00\u00B0 00' 00.00"` }</span>
                        <span className="vehicle-height">{ `0m \u00B1 90m` }</span>
                    </div>
                </div>
                <div className="vehicle-segment-option">
                    <h5 style={ { margin: 0 } }>
                        Current Segment:
                    </h5>
                    <select value="1" >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div className="vehicle-speed-range">
                <h5 style={ { margin: 0 } }>
                    Speed:
                </h5>
                <span className="vehicle-speed-range-input">
                    <input onChange={ (event) => setSpeed(event.target.value) } value={ speed } type="range" min="20" max="30" /> &nbsp; { speed } m/s
                </span>
            </div>
        </Container>
    );
}

export default VehicleControls;