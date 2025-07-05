import type { SyntheticEvent } from 'react';
import './CopyIcon.css';

export type CopyIconProps = {
    handler?: (event: SyntheticEvent) => void;
    isActive?: boolean;
};
function CopyIcon (props: CopyIconProps) {
    return (
        <i className={`copy-icon ${props?.isActive ? 'copy-icon-active': ''}` } onClick={ props.handler } />
    );
}

export default CopyIcon;