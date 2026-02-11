export class ArgumentException extends Error
{
    constructor(argumentName?: string)
    {
        let arg = argumentName ? ` ${argumentName}` : '';

        super(`Invalid argument${arg}`);
    }
}
