export interface Profile {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  name: string;
  location: string;
  email?: string | void;
  bio?: string | void;
  publicRepos: number;
  privateRepos: number;
}

export interface Repo {
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  private: boolean;
  language: void | string;
  followers: number;
}
