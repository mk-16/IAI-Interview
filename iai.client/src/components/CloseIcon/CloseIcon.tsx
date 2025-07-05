import type { SyntheticEvent } from 'react';
import './CloseIcon.css';

export type CloseIconProps = {
    handler: (event: SyntheticEvent) => void;
};
function CloseIcon (props: CloseIconProps) {
    return (
        <i className="close-icon" onClick={ props.handler } />
    );
}

export default CloseIcon;