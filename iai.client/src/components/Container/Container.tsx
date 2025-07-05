import type { Dispatch, PropsWithChildren, SetStateAction, SyntheticEvent } from 'react';
import './Container.css';

export type ContainerProps = PropsWithChildren & {
    handleClick?: (event: SyntheticEvent) => void;
    setIsHovered?: Dispatch<SetStateAction<boolean>>;
    classNames?: string | string[];
};
function Container (props: ContainerProps) {
    return (
        <section
            onMouseEnter={ () => props.setIsHovered ? props.setIsHovered(true) : null }
            onMouseLeave={ () => props.setIsHovered ? props.setIsHovered(false) : null }
            onClick={ props.handleClick }
            className={ `container ${ Array.isArray(props.classNames) ? 
                props.classNames.reduce((acc, curr) => { return acc.concat(' ', curr) }, '') : 
                props.classNames 
            }`
            }>
            { props.children }
        </section>
    );
}

export default Container;