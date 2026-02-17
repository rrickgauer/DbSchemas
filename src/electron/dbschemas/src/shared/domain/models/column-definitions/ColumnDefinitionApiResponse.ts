
export type ColumnDefinitionApiResponse = {
    position: number | null;
    name: string | null;
    columnType: string | null;
    isNullable: boolean | null;
    defaultValue: string | null;
    extra: unknown | null;
};
