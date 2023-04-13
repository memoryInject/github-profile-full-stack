import axios from 'axios';
import { Request, Response } from 'express';
import { genId } from '../utils/generate-id';

/**
* @swagger
* /auth/client-id:
*   get:
*     tags:
*       - auth
*     summary: Get github client id
*     description: Client id is use for signup/login with github app
*     responses:
*       '200':
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 clientId:
*                   type: string
*                   example: '48217f52-8dd2-4170-bd87-cf18d5005aa6'
 */
export const getClientId = (_req: Request, res: Response) => {
  const clientId = process.env.CLIENT_ID;

  res.send({ clientId });
};

/**
* @swagger
* /auth/get-access-token:
*   get:
*     tags:
*       - auth
*     summary: Get github access token
*     description: Github access token used for acccessing user profile and repos
*     parameters:
*       - name: code
*         in: query
*         description: code from Github
*         required: true
*         schema:
*           type: string
*           example: '48217f52-8dd2-4170-bd87-cf18d5005aa6'
*     responses:
*       '200':
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 access:
*                   type: boolean
*                   example: true 
 */
export const getAccessToken = async (req: Request, res: Response) => {
  if (req.session && req.session.access_token) {
    return res.send({ access: true });
  }

  try {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const params = `?client_id=${clientId}&client_secret=${clientSecret}&code=${req.query.code}`;

    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token' + params,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    // There is a user error if github send back error, return here.
    if (data.error) {
      return res.status(400).send({ msg: data.error });
    }

    // If there is a access_token then set it on client cookie.
    if (req.session && data.access_token) {
      const sessionId = genId();

      req.session.access_token = data.access_token;
      req.session.id = sessionId;
    }

    res.send({ access: true });
  } catch (error) {
    // If there is an error send 500
    res.status(500).send({ msg: 'server error' });
  }
};

/**
* @swagger
* /auth/logout:
*   get:
*     tags:
*       - auth
*     summary: Logout current user 
*     description: Clear out cookies 
*     responses:
*       '200':
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true 
 */
export const logout = (req: Request, res: Response) => {
  req.session = null;

  res.send({ success: true });
};
