import type { SyntheticEvent } from 'react';
import './CloseIcon.css';

export type CloseIconProps = {
    handler: (event: SyntheticEvent) => void;
};
function CloseIcon (props: CloseIconProps) {
    //src = "./src/assets/close.png"
    return (
        <i className="close-icon" onClick={ props.handler } />
    );
}

export default CloseIcon;