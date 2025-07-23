import { useEffect } from "react";

export function useDrawPathEffect(state: boolean) {
    const c
    useEffect(() => {
        console.log("mount");
        return () => { console.log("unmount"); };
    }, [ state ]);
}