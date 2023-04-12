import { NextFunction, Request, Response } from 'express';
import { retrieveProfile } from '../services/qeries/profile';
import { retrieveRepos } from '../services/qeries/repos';

export const getCacheProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if there is cache available
    if (req.session && req.session.id) {
      const profileCache = await retrieveProfile(req.session.id);
      // if there is a cache return here
      if (profileCache) {
        console.log('HIT profile cache!');
        return res.send(profileCache);
      }
      console.log('MISS profile cache!');
    }
  } catch (error) {
    return next();
  }

  next();
};

export const getCacheRepos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if there is cache available
    if (req.session && req.session.id) {
      const reposCache = await retrieveRepos(
        req.session.id,
        parseInt(req.query.page as string)
      );
      // if there is a cache return here
      if (reposCache) {
        console.log('HIT repos cache!');
        return res.send({
          page: req.query.page,
          perPage: 5,
          repos: reposCache,
        });
      }
      console.log('MISS repos cache!');
    }
  } catch (error) {
    return next();
  }

  next();
};
