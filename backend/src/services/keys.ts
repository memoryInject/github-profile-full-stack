export const getProfileKey = (sessionId: string) => `profile#${sessionId}`;
export const getReposKey = (sessionId: string, page: number) =>
  `repos:${sessionId}#${page}`;
