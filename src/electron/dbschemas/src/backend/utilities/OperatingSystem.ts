import path from "path";
import os from 'os';
import { access as fileAccess } from "fs";
import { BrowserWindow, dialog } from "electron";

export function osGetBaseOperatingSystemPath(): string
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

export async function osDoesFileExist(file: string): Promise<boolean>
{
    try
    {
        await fileAccess(file, () => { });
        return true;
    }
    catch
    {
        return false;
    }
}


export async function osOpenFilePicker(window: BrowserWindow | null)
{
    if (window == null)
    {
        console.assert(false, `Window is null`);
        return null;
    }
    
    const result = await dialog.showOpenDialog(window, {
        properties: ['openFile'],
    });

    if (result.canceled || result.filePaths.length === 0)
    {
        return null;
    }

    return result.filePaths[0];
}