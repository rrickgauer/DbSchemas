

export class ApiForbiddenException extends Error
{
    constructor (message?: string)
    {
        super(message);
    }
}
