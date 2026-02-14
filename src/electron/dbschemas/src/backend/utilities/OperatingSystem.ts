import path from "path";
import os from 'os';

export function GetBaseOperatingSystemPath(): string
{
    switch (process.platform)
    {
        case 'win32':
            // %LOCALAPPDATA%
            return process.env.LOCALAPPDATA ?? path.join(os.homedir(), 'AppData', 'Local');

        case 'darwin':
            // ~/Library/Application Support
            return path.join(os.homedir(), 'Library', 'Application Support');

        default:
            // Linux (rough equivalent to LocalApplicationData)
            return process.env.XDG_DATA_HOME ?? path.join(os.homedir(), '.local', 'share');
    }
}
