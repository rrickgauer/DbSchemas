import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, '../src/backend/views');
const dest = path.join(__dirname, '../dist/views');

fs.cpSync(src, dest, { recursive: true });

