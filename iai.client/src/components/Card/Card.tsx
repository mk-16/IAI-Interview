import CloseIcon from '../CloseIcon/CloseIcon';
import './Card.css';
import type { PropsWithChildren, SyntheticEvent } from "react";

export type CardProps = PropsWithChildren & {
    closeHandler?: (event: SyntheticEvent) => void;
};

function Card (props: CardProps) {
    return (
        <div className="card" tabIndex={ -1 }>
            {props.closeHandler? <CloseIcon handler={ props.closeHandler } /> : null}
            { props.children }
        </div>
    );
}

export default Card;