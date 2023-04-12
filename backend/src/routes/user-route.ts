import { Router } from 'express';
import { getUserProfile, getUserRepos } from '../controllers/user-controller';

const router = Router();

router.route('/profile').get(getUserProfile);
router.route('/repos').get(getUserRepos);

export { router as userRouter };
