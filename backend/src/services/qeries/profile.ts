import { getProfileKey } from '../keys';
import { client, REDIS_TTL } from '../redis/client';
import { Profile } from '../types';

export const createProfile = async (sessionId: string, profile: Profile) => {
  const profileKey = getProfileKey(sessionId);
  const profileData = JSON.stringify(profile);
  await client.set(profileKey, profileData, { EX: REDIS_TTL });
};

export const retrieveProfile = async (sessionId: string) => {
  const profileKey = getProfileKey(sessionId);
  const profile = await client.get(profileKey);
  if (profile) {
    return JSON.parse(profile);
  }
  return profile;
};
