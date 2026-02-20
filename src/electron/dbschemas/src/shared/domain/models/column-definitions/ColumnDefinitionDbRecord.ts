
// export type ColumnDefinitionDbRecord = {
//     position: number | null;
//     name: string | null;
//     column_type: string | null;
//     is_nullable: boolean | null;
//     default_value: unknown | null;
//     extra: unknown | null;
// };


export type ColumnDefinitionDbRecord = {
    table_name: string | null;
    column_position: number | null;
    column_name: string | null;
    column_data_type: string | null;
    column_is_nullable: boolean | string | null;
    column_default_value: string | null;
    column_extra: unknown | null;
}

        
        
        
        
        
        