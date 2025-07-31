/**
 * EONET Category ID Map
 *
 * v2.1 of events requires a category id
 * v3.0 of categories provides a name as the id
 *
 * This map is used to convert the category name to the id
 * for the v2.1 of events
 */
export const categoryIdMap: Record<string, number> = {
    drought: 6,
    dustHaze: 7,
    earthquakes: 16,
    floods: 9,
    landslides: 14,
    manmade: 19,
    seaLakeIce: 15,
    severeStorms: 10,
    snow: 17,
    tempExtremes: 18,
    volcanoes: 12,
    waterColor: 13,
    wildfires: 8,
}
