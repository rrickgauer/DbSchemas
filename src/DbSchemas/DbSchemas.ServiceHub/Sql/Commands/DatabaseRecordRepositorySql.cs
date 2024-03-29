﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Sql.Commands;

public sealed class DatabaseRecordRepositorySql
{
    public const string SelectAll = @"
        SELECT 
            * 
        FROM 
            Databases
        ORDER BY 
            name COLLATE NOCASE ASC;";


    public const string Insert = @"
        INSERT INTO
            DATABASES (
                name,
                database_type_id,
                database_name,
                username,
                host,
                password,
                file
            )
        VALUES
            (
                @name,
                @database_type_id,
                @database_name,
                @username,
                @host,
                @password,
                @file
            );";


    public const string Update = @"
        UPDATE
            Databases
        SET
            name = @name,
            database_type_id = @database_type_id,
            database_name = @database_name,
            username = @username,
            host = @host,
            password = @password,
            file = @file
        WHERE
            id = @id;";


    public const string Delete = @"
        DELETE FROM
            DATABASES
        WHERE
            id = @id;";
}
