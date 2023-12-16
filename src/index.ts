import * as path from 'path';
import * as fs from 'fs';

export function initialUploadsConfig() {
    if (!fs.existsSync(path.join(__dirname, '../uploads/'))) {
        fs.mkdirSync(path.join(__dirname, '../uploads/'));
    }

    if (!fs.existsSync(path.join(__dirname, '../uploads/pdfs'))) {
        fs.mkdirSync(path.join(__dirname, '../uploads/pdfs'));
    }

    if (!fs.existsSync(path.join(__dirname, '../uploads/profiles'))) {
        fs.mkdirSync(path.join(__dirname, '../uploads/profiles'));
    }
}
