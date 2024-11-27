import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import expressPrometheusMiddleware from 'express-prometheus-middleware';
import { authMiddleware } from './middleware/auth';
import routes from './routes';

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  expressPrometheusMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
  }),
);

app.use(authMiddleware);

app.use('/', routes);

export default app;
