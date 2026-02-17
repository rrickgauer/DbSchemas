
export interface IApplicationData
{
    readonly IsDevelopment: boolean;
    readonly ApplicationName: string;
    readonly BaseDirectory: string;
    readonly DataDirectory: string;
    readonly DatabaseFileName: string;
    readonly DatabaseFile: string;
    readonly TemplateDatabaseFile: string;
}
