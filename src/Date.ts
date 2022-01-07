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
    const ms = `${value.getMilliseconds()}`;
    const wd = value.getDay();

    return fillTemplate(template, {
        "{Y}": year,
        "{YYYY}": `${year}`.padStart(4, "0"),
        "{M}": (monthFormat ?? String)(month),
        "{MM}": `${month}`.padStart(2, "0"),
        "{D}": `${day}`,
        "{DD}": `${day}`.padStart(2, "0"),
        "{h}": `${hour}`,
        "{hh}": `${hour}`.padStart(2, "0"),
        "{m}": `${minute}`,
        "{mm}": `${minute}`.padStart(2, "0"),
        "{s}": `${second}`,
        "{ss}": `${second}`.padStart(2, "0"),
        "{ms}": `${minute}`,
        "{0ms}": `${minute}`.padStart(3, "0"),
        "{wd}": (weekdayFormat ?? String)(wd),
    });
}
