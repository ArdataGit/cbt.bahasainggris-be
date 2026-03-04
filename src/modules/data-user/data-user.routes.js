import express from 'express';
const router = express.Router();
import * as dataUserController from './data-user.controller.js';

router.get('/', dataUserController.getAllDataUsers);
router.get('/:id', dataUserController.getDataUserById);
router.post('/', dataUserController.createDataUser);

export default router;
