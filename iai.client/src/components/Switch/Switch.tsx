import { useState, type SetStateAction, type SyntheticEvent } from 'react';
import './Switch.css';


interface SwitchOnChange extends SyntheticEvent<HTMLInputElement> {
    target: EventTarget & {
        checked: boolean;
    };
}

export type SwitchProps = { id?: string; name?: string; state?: boolean, handler?: (event: SwitchOnChange) => React.Dispatch<SetStateAction<boolean>>; };
function Switch (props: SwitchProps) {

    return (
        <input className="switch" id={ props.id } name={ props.name } type="checkbox" checked={ props.state } onChange={ props.handler } />
    );
}

export default Switch;