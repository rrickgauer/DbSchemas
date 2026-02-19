

import { Guid } from '../domain/types/CustomTypes';

export function getRandomGuid(): Guid
{
    if (globalThis.crypto?.randomUUID)
    {
        return globalThis.crypto.randomUUID() as Guid;
    }

    const { randomUUID } = require('crypto');
    return randomUUID() as Guid;
}
