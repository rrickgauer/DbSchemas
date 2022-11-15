﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Sql.Commands;

public sealed class DatabaseRepositorySql
{
    public const string SelectAll = @"SELECT * FROM Databases;";


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
}
