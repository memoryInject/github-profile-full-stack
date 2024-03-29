import axios from 'axios';
import { Request, Response } from 'express';
import { createProfile } from '../services/qeries/profile';
import { createRepos } from '../services/qeries/repos';
import { Profile, Repo } from '../services/types';

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *       - user
 *     summary: Get user profile details
 *     description: Get current user profile based on cookie session
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (req.session && req.session.access_token) {
      const { data } = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: 'Bearer ' + req.session.access_token,
        },
      });

      // There is a user error if github send back error, return here.
      if (data.error) {
        return res.status(400).send({ msg: data.error });
      }

      const userProfile: Profile = {
        login: data.login,
        avatarUrl: data.avatar_url,
        htmlUrl: data.html_url,
        name: data.name,
        location: data.location,
        email: data.email,
        bio: data.bio,
        publicRepos: data.public_repos,
        privateRepos: data.total_private_repos,
      };

      // Create user profile cache
      await createProfile(req.session.id, userProfile);

      return res.send(userProfile);
    }

    res.status(400).send({ success: false });
  } catch (error) {
    // If there is an error send 500
    res.status(500).send({ msg: 'server error' });
  }
};

/**
 * @swagger
 * /user/repos:
 *   get:
 *     tags:
 *       - user
 *     summary: Get user repos
 *     description: Get current user repos based on cookie session, 5 repos per page
 *     parameters:
 *       - name: page
 *         in: query
 *         description: pagination page
 *         required: true
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 perPage:
 *                   type: integer
 *                   example: 5
 *                 repos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Repo'
 */
export const getUserRepos = async (req: Request, res: Response) => {
  try {
    if (req.session && req.session.access_token) {
      const { data } = await axios.get(
        `https://api.github.com/user/repos?per_page=5&page=${req.query.page}`,
        {
          headers: {
            Authorization: 'Bearer ' + req.session.access_token,
          },
        }
      );

      // There is a user error if github send back error, return here.
      if (data.error) {
        return res.status(400).send({ msg: data.error });
      }

      const repos: Repo[] = data.map(
        (repo: {
          name: string;
          full_name: string;
          html_url: string;
          description: string;
          private: boolean;
          language: string;
          watchers: number;
        }) => {
          return {
            name: repo.name,
            fullName: repo.full_name,
            htmlUrl: repo.html_url,
            description: repo.description,
            private: repo.private,
            language: repo.language,
            followers: repo.watchers,
          };
        }
      );

      // Create user repos cache
      await createRepos(
        req.session.id,
        parseInt(req.query.page as string),
        repos
      );

      return res.send({ page: req.query.page, perPage: 5, repos });
    }

    res.status(400).send({ success: false });
  } catch (error) {
    // If there is an error send 500
    res.status(500).send({ msg: 'server error' });
  }
};
