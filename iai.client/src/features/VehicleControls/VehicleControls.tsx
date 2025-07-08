import { useState } from 'react';
import './VehicleControls.css';
import Container from '../../components/Container/Container';
import CopyIcon from '../../components/CopyIcon/CopyIcon';
function VehicleControls() {
    function copyCoordinate() {
        const coordinate = { latitude: 0, longitude: 0 };
        navigator.clipboard.writeText(`${ coordinate?.latitude } ${ coordinate?.longitude }`);
    }
    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <Container classNames='vehicle-container'>
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
            </div>
        </Container>
    );
}

export default VehicleControls;