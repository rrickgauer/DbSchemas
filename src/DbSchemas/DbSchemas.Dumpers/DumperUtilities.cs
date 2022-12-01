﻿using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.CustomExceptions;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Databases;

public static class DumperUtilities
{
    /// <summary>
    /// Execute a select command from the given DbCommand.
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    /// <exception cref="InvalidConnectionException">Thrown if the connection could not be opened</exception>
    public static async Task<DataTable> ExecuteQueryAsync(DbCommand command)
    {
        // try to open the connection
        bool couldConnect = await TryOpenCommandConnectionAsync(command.Connection);

        if (!couldConnect)
        {
            throw new InvalidConnectionException();
        }

        // execute the query
        using DbDataReader reader = await command.ExecuteReaderAsync();
        
        // load up the datatable with the query results
        DataTable dataTable = new();
        dataTable.Load(reader);

        return dataTable;
    }

    /// <summary>
    /// Try to open the given connection
    /// </summary>
    /// <param name="connection"></param>
    /// <returns></returns>
    private static async Task<bool> TryOpenCommandConnectionAsync(DbConnection connection)
    {
        // don't need to open a connection that is already open
        if (connection.State == ConnectionState.Open)
        {
            return true;
        }

        // try to open the connection
        try
        {
            await connection.OpenAsync();
        }
        catch (Exception)
        {
            return false;
        }

        return true;
    }


    public static void AddDataRowToDict(DataRow row, Dictionary<string, TableSchema> tableSchemas, IColumnMapper mapper, string tableNameColumn)
    {
        // get the table that the current row belongs to
        var tableName = row.Field<string>(tableNameColumn);

        // add a new table schema if it doesn't already exist
        tableSchemas.TryAdd(tableName, new(tableName));

        // map out the datarow to a ColumnDefintion and add it to the collection
        ColumnDefinition mappedColumn = mapper.ToColumnDefinition(row);
        tableSchemas[tableName].Columns.Add(mappedColumn);
    }
}
