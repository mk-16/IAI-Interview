import type { Map } from "ol";
import { click } from "ol/events/condition";
import { Select } from "ol/interaction";
import { useEffect } from "react";

export function ddToDMS(dd: number, axis: "longitude" | "latitude") {
    const absoluteDd = Math.abs(dd);
    const degrees = Math.floor(absoluteDd);
    const fractionalMinutes = (absoluteDd - degrees) * 60;
    const minutes = Math.floor(fractionalMinutes);
    const seconds = ((fractionalMinutes - minutes) * 60).toFixed(2);
    return `${ axis == "latitude" ? dd > 0 ? "N" : "S" : dd > 0 ? "E" : "W" } ${ degrees }\u00B0${ minutes }'${ seconds }" `;
}

export function useSelect(view: Map) {
    useEffect(() => {
        const interaction = new Select({
            hitTolerance: 10,
            multi: true,
            filter: (f, l) => {
                return !(f.getId() == 'car-fov' || f.getId() == 'car');
            },
            condition: click,
        });
        interaction.on('select', (event) => {
            event.selected.forEach((feature, index) => {
                if (feature.getId() == 'car-fov') {
                    event.selected.splice(index, 1);
                }
            });
        });
        view.addInteraction(interaction);
        return () => { view.removeInteraction(interaction); };
    }, []);
}