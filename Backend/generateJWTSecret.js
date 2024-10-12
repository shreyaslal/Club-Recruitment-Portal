import { randomBytes } from 'crypto';

const secretKey = randomBytes(64).toString('hex');

console.log(`Your JWT secret key is: ${secretKey}`);