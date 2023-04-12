import { Router } from 'express';
import { getAccessToken, getClientId, logout } from '../controllers/auth-controller';

const router = Router();

router.route('/client-id').get(getClientId);
router.route('/get-access-token').get(getAccessToken);
router.route('/logout').get(logout);

export { router as authRouter };
