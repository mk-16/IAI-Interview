import { useEffect } from "react";

export function useDrawPolygonEffect(state: boolean) {

    useEffect(() => {
        console.log("mount");
        return () => { console.log("unmount"); };
    }, [ state ]);
}