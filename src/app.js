import express from 'express';
import logger from 'morgan';
import { userRoutes, taskRoutes } from './server/routes';

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);
app.use('/task', taskRoutes)

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error:err
  })
});

export default app;