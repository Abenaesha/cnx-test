import { Router } from 'express';
import timeRouter from './time';
import metricsRouter from './metrics';

const router = Router();

router.use('/time', timeRouter);
router.use('/metrics', metricsRouter);

export default router;
