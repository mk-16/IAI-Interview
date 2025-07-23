import { Draw, Select } from "ol/interaction";
import BaseLayer from "ol/layer/Base";
import { Source } from "ol/source";
import { createContext } from "react";


export const MapViewContext = createContext(new Map<string, Source | BaseLayer | Draw | Select>());