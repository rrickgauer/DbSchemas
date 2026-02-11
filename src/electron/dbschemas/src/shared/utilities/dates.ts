
import {DateTime, DateTime as dt } from 'luxon';

import { isString } from "./converters";
import { DateTimeValid, Nullable } from '../domain/types/types';
import { notNull } from './nullable';
import { Valid } from 'luxon/src/_util';

export function datesAddWeeks(value: dt, weeks: number): DateTimeValid
{
    return value.plus({
        weeks: weeks,
    });
}


export function datesAddDays(value: dt, days: number): DateTimeValid
{
    return value.plus({
        days: days,
    });
}

export function datesGetDateSeries(value: dt, numberOfDays: number): Set<DateTimeValid>
{
    const series = new Set<DateTimeValid>();

    for (let i = 1; i <= numberOfDays; i++)
    {
        const nextDate = datesAddDays(value, i);
        series.add(nextDate);
    }

    return series;
}

export function datesGetDatesInRange(startsOn: dt, endsOn: dt): Set<DateTimeValid>
{
    const series = new Set<DateTimeValid>();
    series.add(startsOn);

    let nextDate = startsOn;

    while (nextDate.toISODate() != endsOn.toISODate())
    {
        nextDate = datesAddDays(nextDate, 1);
        series.add(nextDate);
    }

    return series;
}

/**
 * Returns datetime formatted: 10/14/1983
 */
export function datesGetFullDateDisplay(dateValue: string): string;
export function datesGetFullDateDisplay(dateValue: dt): string;
export function datesGetFullDateDisplay(dateValue: string | dt): string
{
    let datetime = isString(dateValue) ? datesParse(dateValue) : dateValue;
    return datetime.toLocaleString(dt.DATE_SHORT);
}

export function datesGetDateAndTimeDisplay(value: string): string;
export function datesGetDateAndTimeDisplay(value: dt): string;
export function datesGetDateAndTimeDisplay(value: dt | string): string
{
    if (isString(value))
    {
        value = datesParse(value);
    }

    return value.toLocaleString(DateTime.DATETIME_SHORT);
}

export function datesParse(dateValue: string): DateTimeValid
{
    const result = dt.fromISO(dateValue) as DateTimeValid;

    return result;
}

export function datesToIso(date: DateTime): string
{
    return date.toISO()!;
}

export function datesToDateOnlyString(value: string): string;
export function datesToDateOnlyString(value: dt): string;
export function datesToDateOnlyString(value: string | dt): string
{
    if (isString(value))
    {
        value = datesParse(value);
    }

    return value.toISODate()!;
}


export function datesGetCurrentDatetimeString(): string
{
    return datesGetCurrentDatetime().toISO();
}

export function datesGetCurrentDatetime(): DateTime<Valid>
{
    return dt.now()!;
}

export function datesGetMondayInWeek(date: dt): DateTimeValid
{
    let monday = date;

    while (monday.weekday !== 1)
    {
        monday = monday.minus({
            days: 1
        });
    }

    return monday;
}


export function datesToHtmlTimeInputString(date: Nullable<string>): string | null;
export function datesToHtmlTimeInputString(date: Nullable<dt>): string | null;
export function datesToHtmlTimeInputString(date: dt | string | null): string | null
{
    if (!date)
    {
        return null;
    }

    if (isString(date))
    {
        date = datesParse(date);
    }

    return date.toLocaleString(dt.TIME_24_SIMPLE);
}

export function datesToHttpTimeString(value: Nullable<string>): string | null;
export function datesToHttpTimeString(value: Nullable<dt>): string | null;
export function datesToHttpTimeString(value: dt | string | null): string | null
{
    if (!value)
    {
        return null;
    }

    if (isString(value))
    {
        value = datesParse(value);
    }

    return value.toLocaleString(dt.TIME_24_WITH_SECONDS)
}

/**
 * Returns a datetime string formatted like '09:30 AM'
 */
export function datesToDisplayTime(value: string): string;
export function datesToDisplayTime(value: dt): string;
export function datesToDisplayTime(value: dt | string): string
{
    if (isString(value))
    {
        value = datesParse(value);
    }

    return value.toLocaleString(dt.TIME_SIMPLE);
}



export function datesGetInputValue(inputElement: HTMLInputElement): DateTimeValid | null
{
    return notNull(inputElement.value) ? datesParse(inputElement.value) : null;
}

export function datesToSortValue(date: string): number;
export function datesToSortValue(date: dt): number;
export function datesToSortValue(date: string | dt): number
{
    if (isString(date))
    {
        date = datesParse(date);
    }

    return date.toUnixInteger();
}



const DIFF_MINUTES = 60;
const DIFF_HOURS = 24;
const DIFF_DAYS = 30;
const DIFF_MONTHS = 12;

export function datesGetTimeAgo(start: dt | string): string;
export function datesGetTimeAgo(start: dt | string, end: dt): string;
export function datesGetTimeAgo(start: dt | string, end?: dt): string
{
    end ??= datesGetCurrentDatetime();

    if (isString(start))
    {
        start = datesParse(start);
    }

    const minutesDiff = Math.floor(end.diff(start, 'minutes').minutes);
    
    if (minutesDiff < 1)
    {
        return 'a minute ago';
    }

    if (minutesDiff < DIFF_MINUTES)
    {
        return `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`;
    }

    const hoursDiff = Math.floor(end.diff(start, 'hours').hours);
    if (hoursDiff < DIFF_HOURS)
    {
        return `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''}`;
    }

    const daysDiff = Math.floor(end.diff(start, 'days').days);
    if (daysDiff < DIFF_DAYS)
    {
        return `${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
    }

    const monthsDiff = Math.floor(end.diff(start, 'months').months);
    if (monthsDiff < DIFF_MONTHS)
    {
        return `${monthsDiff} month${monthsDiff !== 1 ? 's' : ''}`;
    }

    const yearsDiff = Math.floor(end.diff(start, 'years').years);
    return `${yearsDiff} year${yearsDiff !== 1 ? 's' : ''}`;
}

