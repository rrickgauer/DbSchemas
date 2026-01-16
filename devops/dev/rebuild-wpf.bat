@echo off
cd C:\xampp\htdocs\files\DbSchemas\src\DbSchemas

dotnet build DbSchemas.WpfGui

cd C:\xampp\htdocs\files\DbSchemas\src\DbSchemas\DbSchemas.WpfGui\bin\Debug\net8.0-windows7.0

start DbSchemas.WpfGui.exe

exit
