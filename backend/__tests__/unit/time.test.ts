import express from 'express';
import request from 'supertest';
import timeRouter from '../../src/routes/time';

describe('/time Route', () => {
  const app = express();

  beforeAll(() => {
    app.use('/time', timeRouter);
  });

  it('should return the current epoch time', async () => {
    const res = await request(app).get('/time');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('epoch');
    expect(typeof res.body.epoch).toBe('number');
  });
});
