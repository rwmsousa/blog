import path from 'path';
import express from 'express';
import payload from 'payload';
import { seed } from './seed';
import apiMiddleware from './middlewares/apiMiddleware';
import cors from 'cors';

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const app = express();

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);

      if (process.env.PAYLOAD_PUBLIC_SEED === 'true') {
        await seed(payload);
      }
    },
  });

  var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

  app.get('/', (_, res) => {
    res.redirect('/admin');
  });

  app.use('/api', apiMiddleware);
  app.use('/api', express.json());

  app.listen(process.env.PAYLOAD_PORT, () => {
    console.log(`Server is running on ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`);
  });
};

start();
