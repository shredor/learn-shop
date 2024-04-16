import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { sequelize } from './db';
import { errorHandlingMiddleware } from './middleware/ErrorHandlingMiddleware';
import './models';
import { apiRouter } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/static', express.static(path.resolve(__dirname, '..', 'static')));
app.use('/api', apiRouter);
app.use(errorHandlingMiddleware);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
