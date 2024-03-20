CREATE TABLE Databases (
    id               INTEGER  PRIMARY KEY
                              NOT NULL
                              UNIQUE,
    name             TEXT     NOT NULL UNIQUE,
    database_type_id INTEGER  NOT NULL,
    database_name    TEXT,
    username         TEXT,
    host             TEXT,
    password         TEXT,
    file             TEXT,
    created_on       DATETIME NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (
        database_type_id
    )
    REFERENCES Database_Types (id) ON UPDATE CASCADE
                                   ON DELETE CASCADE
);
