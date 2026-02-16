
export const SQL_COMMAND_SELECT_ALL_CONNECTIONS = `SELECT * FROM Databases;`;


export const SQL_COMMAND_INSERT_NEW_CONNECTION = `
    INSERT INTO
        Databases (
            name,
            database_type_id,
            database_name,
            file,
            host,
            password,
            username
        )
    VALUES
        (
            @name,
            @database_type_id,
            @database_name,
            @file,
            @host,
            @password,
            @username
        );
`;


export const SQL_COMMAND_SELECT_CONNECTION = 
`
    SELECT
        d.*
    FROM
        Databases d
    WHERE
        d.id = @id
    LIMIT
        1;
`.trim();


export const SQL_COMMAND_UPDATE_CONNECTION = `
    UPDATE
        Databases
    SET
        name = @name,
        database_type_id = @database_type_id,
        database_name = @database_name,
        file = @file,
        host = @host,
        password = @password,
        username = @username
    WHERE
        id = @id;
`;


export const SQL_COMMAND_DELETE_CONNECTION = `
DELETE FROM Databases
WHERE id = @id
LIMIT 1;
`;


