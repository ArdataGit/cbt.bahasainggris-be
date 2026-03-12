import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

if (process.env.JWT_SECRET === 'your-super-secret-key') {
  console.warn('WARNING: Using default JWT_SECRET. Please set JWT_SECRET in .env file.');
}
