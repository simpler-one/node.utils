import { fillTemplate } from "./String";

export const WEEKDAY_NAMES = Object.freeze([]);


export function format(
    value: Date, template: string,
    { monthFormat, weekdayFormat }: {
        monthFormat?: (month: number) => string,
        weekdayFormat?: (weekday: number) => string,
    } = undefined
): string {
    const year = `${value.getFullYear()}`;
    const month = value.getMonth() + 1;
    const day = `${value.getDate()}`;
    const hour = `${value.getHours()}`;
    const minute = `${value.getMinutes()}`;
    const second = `${value.getSeconds()}`;
    const ms = `${value.getMillseconds()}`;
    const wd = value.getDay();

    return fillTemplate(template, {
        "{Y}": year,
        "{YYYY}": `${year}`.padStart("0", 4),
        "{M}": (monthFormat ?? String)(month),
        "{MM}": `${month}`.padStart("0", 2),
        "{D}": ${day},
        "{DD}": `${day}`.padStart("0", 2),
        "{h}": `${hour}`,
        "{hh}": `${hour}`.padStart("0", 2),
        "{m}": `${minute}`,
        "{mm}": `${minute}`.padStart("0", 2),
        "{s}": `${second}`,
        "{ss}": `${second}`.padStart("0", 2),
        "{ms}": `${minute}`,
        "{0ms}": `${minute}`.padStart("0", 3),
        "{wd}": (weekdayFormat ?? String)(weekday),
    });
}
