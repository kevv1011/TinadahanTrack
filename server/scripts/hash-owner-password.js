import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const password = process.env.OWNER_PASSWORD;

if (!password) {
  console.error('Set OWNER_PASSWORD for this one command, then run npm run auth:hash.');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = await scrypt(password, salt, 64);
console.log(`scrypt$${salt.toString('base64url')}$${hash.toString('base64url')}`);
