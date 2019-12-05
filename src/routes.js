import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionsController';
import StudentController from './app/controllers/StudentController';
import PlanoController from './app/controllers/PlanoController';
import MatriculaController from './app/controllers/MatriculaController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/plano', PlanoController.store);
routes.get('/plano', PlanoController.index);
routes.delete('/plano/:id', PlanoController.delete);
routes.put('/plano/:id', PlanoController.update);

routes.post('/matricula', MatriculaController.store);
routes.get('/matricula', MatriculaController.index);
routes.put('/matricula/:id', MatriculaController.update);
routes.delete('/matricula/:id', MatriculaController.delete);

routes.post('/teste', (req, res) => {
  return res.send(req.body);
});

export default routes;
