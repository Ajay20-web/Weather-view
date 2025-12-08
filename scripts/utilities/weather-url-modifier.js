export function addUnitsToUrl(url, unit) {
    if (unit === "imperial") {
        return `${url}&temperature_unit=fahrenheit&wind_speed_unit=mph`;
    }
    return url;
};