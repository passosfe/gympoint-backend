import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import SubscriptionController from './app/controllers/SubscriptionController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions', SubscriptionController.store);
routes.put('/subscriptions/:id', SubscriptionController.update);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.put('/users', UserController.update);

export default routes;
