import { DateTime } from "luxon";

export type Nullable<T> = T | null;

export type ParameterBindings = Record<string, any>;
export type DataRow = Record<string, any>;
export type DataTable = DataRow[];

export type EmptyConstructor<T> = new () => T;

export type DateTimeValid = DateTime<true>
