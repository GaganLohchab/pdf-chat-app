import express from 'express';
import multer from 'multer';
import { createProjectController, getProjectsController } from '../controllers/projectController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), createProjectController);
router.get('/', getProjectsController);

export default router;
