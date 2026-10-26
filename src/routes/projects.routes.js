const express = require('express');
const controller = require('../controllers/projects.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const membersRoutes = require('./members.routes');

const router = express.Router();

router.get('/', authenticate, controller.listProjects);
router.post('/', authenticate, controller.createProject);
router.get('/:id', authenticate, controller.getProject);
router.put('/:id', authenticate, controller.updateProject);
router.delete('/:id', authenticate, controller.deleteProject);

router.use('/:id/members', authenticate, membersRoutes);

module.exports = router;
