import path from 'node:path';
import { osGetBaseOperatingSystemPath } from '../../utilities/OperatingSystem';
import { IApplicationData } from './IApplicationData';


export class ApplicationDataProduction implements IApplicationData
{
    public get IsDevelopment(): boolean
    {
        return false;
    }

    public get ApplicationName(): string
    {
        return 'DbSchemas';
    }

    public get DatabaseFileName(): string
    {
        return 'DbSchemas-Data.db';
    }

    public get BaseDirectory(): string
    {
        return path.join(osGetBaseOperatingSystemPath(), this.ApplicationName);
    }

    public get DataDirectory(): string
    {
        return path.join(this.BaseDirectory, 'data');
    }

    public get DatabaseFile(): string
    {
        return path.join(this.DataDirectory, this.DatabaseFileName);
    }

    public get TemplateDatabaseFile(): string
    {
        return path.join(process.cwd(), 'resources', 'sql', this.DatabaseFileName);
    }
}
