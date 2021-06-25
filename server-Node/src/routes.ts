import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';

import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

const router = Router();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAdmin, createTagController.handle);

export { router }