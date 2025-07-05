export function ddToDMS(dd: number, axis: "longitude" | "latitude") {
    const absoluteDd = Math.abs(dd);
    const degrees = Math.floor(absoluteDd);
    const fractionalMinutes = (absoluteDd - degrees) * 60;
    const minutes = Math.floor(fractionalMinutes);
    const seconds = ((fractionalMinutes - minutes) * 60).toFixed(2);
    return `${ axis == "latitude" ? dd > 0 ? "N" : "S" : dd > 0 ? "E" : "W" } ${ degrees }\u00B0${ minutes }'${ seconds }" `;
}
