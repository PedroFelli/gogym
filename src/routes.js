import { Router } from 'express';
import UserController from './app/controllers/UserController';

import User from './app/models/User';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/teste', (req, res) => {
  return res.send(req.body);
});

export default routes;
