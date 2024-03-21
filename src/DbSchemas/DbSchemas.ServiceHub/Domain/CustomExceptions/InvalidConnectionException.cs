/***********************************************************************

This custom exception class is for when a connection could not be openend for a Database

************************************************************************/

namespace DbSchemas.ServiceHub.Domain.CustomExceptions;

public class InvalidConnectionException : Exception
{
    public InvalidConnectionException() : base("Could not connect to the database with the connection values.")
    {

    }
}
