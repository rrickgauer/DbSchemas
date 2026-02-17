import { DateTime } from "luxon";

declare const __brand: unique symbol;
export type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand };

export type Nullable<T> = T | null;

export type ParameterBindings = Record<string, any>;
export type DataRow = Record<string, any>;
export type DataTable = DataRow[];

// export type ParameterBindings = Brand<Record<string, any>, "ParameterBindings">;
// export type DataRow = Brand<Record<string, any>, "DataRow">;
// export type DataTable = Brand<DataRow[], "DataTable">;


export type DateTimeValid = DateTime<true>;
// export type DateTimeValid = Brand<DateTime<true>, "DateTimeValid">;

export type EmptyConstructor<T> = new () => T;
export type Guid = string & { readonly __brand: 'Guid' };