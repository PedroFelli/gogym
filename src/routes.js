import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionsController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/teste', (req, res) => {
  return res.send(req.body);
});

export default routes;
