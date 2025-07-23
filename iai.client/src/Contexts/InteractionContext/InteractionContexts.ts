import { createContext, useContext } from "react";
import { Select, Draw } from 'ol/interaction';
import * as interactions from 'ol/interaction';

const SelectInteractionContext = createContext(new Select());
const DrawInteractionContext = createContext(new Draw({ type: 'Polygon' }));

const test = useContext(DrawInteractionContext);
