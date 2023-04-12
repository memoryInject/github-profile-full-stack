import { Router } from 'express';
import { getUserProfile, getUserRepos } from '../controllers/user-controller';
import { getCacheRepos, getCacheProfile } from '../middlewares/cache';

const router = Router();

router.route('/profile').get(getCacheProfile, getUserProfile);
router.route('/repos').get(getCacheRepos, getUserRepos);

export { router as userRouter };
