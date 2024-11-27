import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ epoch: Math.floor(Date.now() / 1000) });
});

export default router;
