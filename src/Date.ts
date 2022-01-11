import { fillTemplate } from "./String";

export const DEFAULT_WEEKDAY_NAMES = Object.freeze(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
export const DEFAULT_MONTH_NAMES = Object.freeze(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);


export function format(
    value: Date, template: string,
    opt: {
        monthNames?: string[],
        weekdayNames?: string[],
    } = undefined
): string {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();
    const hour = value.getHours();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    const ms = value.getMilliseconds();
    const wd = value.getDay();

    return fillTemplate(template, {
        "{Y}": year,
        "{YYYY}": `${year}`.padStart(4, "0"),
        "{M}": month,
        "{MM}": `${month}`.padStart(2, "0"),
        "{MMM}": (opt?.monthNames ?? DEFAULT_MONTH_NAMES)[month - 1],
        "{D}": `${day}`,
        "{DD}": `${day}`.padStart(2, "0"),
        "{h}": `${hour}`,
        "{hh}": `${hour}`.padStart(2, "0"),
        "{m}": `${minute}`,
        "{mm}": `${minute}`.padStart(2, "0"),
        "{s}": `${second}`,
        "{ss}": `${second}`.padStart(2, "0"),
        "{ms}": `${ms}`,
        "{0ms}": `${minute}`.padStart(3, "0"),
        "{wd}": (opt?.weekdayNames ?? DEFAULT_WEEKDAY_NAMES)[wd],
    });
}
