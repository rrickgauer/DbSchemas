import { ApplicationDataProduction } from './ApplicationDataProduction';


export class ApplicationDataDev extends ApplicationDataProduction
{
    public override get IsDevelopment(): boolean
    {
        return true;
    }

    public override get ApplicationName(): string
    {
        return 'DbSchemas-Dev';
    }
}
