import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../../repositories/prisma';
import { generateInviteCode } from '../../utils/invite-code';
import { AuthPayload } from '../../plugins/auth';

const googleClientId = process.env.GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error('GOOGLE_CLIENT_ID environment variable is required');
}

const googleClient = new OAuth2Client(googleClientId);

interface GoogleUser {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

export async function verifyGoogleToken(idToken: string): Promise<GoogleUser> {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: googleClientId,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error('Invalid Google token payload');
  }

  return {
    sub: payload.sub!,
    email: payload.email!,
    name: payload.name,
    picture: payload.picture,
  };
}

async function generateUniqueUsername(email: string): Promise<string> {
  const baseUsername = email.split('@')[0];
  let username = baseUsername.replace(/[^a-zA-Z0-9_]/g, '_');
  let counter = 1;

  while (await prisma.user.findUnique({ where: { username } })) {
    username = `${baseUsername}_${counter}`.replace(/[^a-zA-Z0-9_]/g, '_');
    counter++;
  }

  return username;
}

export async function upsertUser(googleUser: GoogleUser): Promise<AuthPayload> {
  const existingUser = await prisma.user.findUnique({
    where: { googleId: googleUser.sub },
  });

  if (existingUser) {
    return {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username || undefined,
      displayName: existingUser.displayName || undefined,
      avatarUrl: existingUser.avatarUrl || undefined,
    };
  }

  const email = googleUser.email.toLowerCase();
  const username = await generateUniqueUsername(email);
  const displayName = googleUser.name || null;
  const avatarUrl = googleUser.picture || null;
  const inviteCode = generateInviteCode();

  const user = await prisma.user.create({
    data: {
      googleId: googleUser.sub,
      email,
      username,
      displayName,
      avatarUrl,
      inviteCode,
    },
    select: {
      id: true,
      email: true,
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  });

  return {
    id: user.id,
    email: user.email,
    username: user.username || undefined,
    displayName: user.displayName || undefined,
    avatarUrl: user.avatarUrl || undefined,
  };
}

export async function getCurrentUser(userId: string): Promise<AuthPayload | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username || undefined,
    displayName: user.displayName || undefined,
    avatarUrl: user.avatarUrl || undefined,
  };
}