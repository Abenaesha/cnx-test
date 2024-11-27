import express, { Router } from 'express';
import client from 'prom-client';
import request from 'supertest';
import metricsRouter from '../../src/routes/metrics';

describe('/metrics Route', () => {
  const app = express();
  const router = Router();

  beforeAll(() => {
    app.use('/metrics', metricsRouter);
  });

  beforeEach(() => {
    client.register.clear();
    new client.Counter({
      name: 'custom_http_requests_total',
      help: 'Custom total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });
  });

  it('should return Prometheus metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.text).toContain('# HELP');
    expect(res.text).toContain('# TYPE');
  });

  it('should increment the custom HTTP requests counter', async () => {
    await request(app).get('/metrics');
    const metrics = await client.register.metrics();
    expect(metrics).toContain('custom_http_requests_total');
  });
});
