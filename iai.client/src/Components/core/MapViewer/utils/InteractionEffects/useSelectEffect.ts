import { useEffect } from "react";

export function useSelectEffect(state: boolean) {
    useEffect(() => {
        console.log("mount");
        return () => { console.log("unmount"); };
    }, [ state ]);
}