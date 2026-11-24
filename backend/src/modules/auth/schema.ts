import { z } from 'zod';

export const GoogleAuthBodySchema = z.object({
  idToken: z.string().min(1, 'idToken is required'),
});

export type GoogleAuthBody = z.infer<typeof GoogleAuthBodySchema>;

export const InviteCodeSchema = z.string().length(32, 'Invite code must be 32 characters');

export type InviteCode = z.infer<typeof InviteCodeSchema>;