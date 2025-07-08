import { Map } from "ol";
import { defaults } from "ol/control";
import { createContext } from "react";

export const ViewContext = createContext<Map>(new Map({
    controls: defaults({
        zoom: false,
        rotate: false,
    }),
}));
