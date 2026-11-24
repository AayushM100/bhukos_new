import { randomBytes } from 'crypto';

export function generateInviteCode(): string {
  // Generate a 32-character URL-safe string
  const bytes = randomBytes(24); // 24 bytes = 32 characters in base64url
  return bytes.toString('base64url');
}