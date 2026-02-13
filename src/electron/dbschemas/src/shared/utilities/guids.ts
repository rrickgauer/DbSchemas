

import { Guid } from '../domain/types/types';

export function getRandomGuid(): Guid
{
    if (globalThis.crypto?.randomUUID)
    {
        return globalThis.crypto.randomUUID() as Guid;
    }

    const { randomUUID } = require('crypto');
    return randomUUID() as Guid;
}
