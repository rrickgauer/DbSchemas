
export const SELECT_ALL_DATABASE_CONNECTIONS = `SELECT * FROM Databases;`;


export const insert_new_connection = `
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