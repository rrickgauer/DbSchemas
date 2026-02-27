sqlite3 "C:\Users\Ryan.Rickgauer\AppData\Local\DbSchemas\data\DbSchemas-Data.db" .schema > "C:\xampp\htdocs\files\DbSchemas\sql\.schemas.sql"
sqlite3 "C:\Users\Ryan.Rickgauer\AppData\Local\DbSchemas\data\DbSchemas-Data.db" ".mode insert select * from Database_Types;" > "C:\xampp\htdocs\files\DbSchemas\sql\.data.sql"

pause