import { Router } from 'express';
import client from 'prom-client';

const router = Router();

const customHttpRequestsTotal = new client.Counter({
  name: 'custom_http_requests_total',
  help: 'Custom total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

router.use((req, res, next) => {
  res.on('finish', () => {
    customHttpRequestsTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode,
    });
  });
  next();
});

router.get('/', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(await client.register.metrics());
});

export default router;
