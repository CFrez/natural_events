import { DateTime } from 'luxon'

/**
 * Convert a date to a string.
 *
 * __Required__
 * @param date - The date to convert.
 *
 * __Optional__
 * @param time - Whether to include the time in the string.
 *
 * @returns The date as a locale string.
 */
export const convertDateToString = (date: Date | string, time = false) => {
    if (typeof date === 'string') {
        date = new Date(date)
    }

    return DateTime.fromJSDate(date).toLocaleString(
        time ? DateTime.DATETIME_SHORT : DateTime.DATE_SHORT,
    )
}
