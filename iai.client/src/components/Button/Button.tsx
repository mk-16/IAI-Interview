import type { PropsWithChildren, SyntheticEvent } from "react";


export type ButtonProps = PropsWithChildren & {
    clickHandler: (event: SyntheticEvent) => void;
    disabled?: boolean;
}
function Button (props: ButtonProps) {
    return (
        <button disabled={ props.disabled } onClick={ props.clickHandler }>{ props.children }</button>
    );
}

export default Button;