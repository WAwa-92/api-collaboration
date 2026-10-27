const express = require('express');
const controller = require('../controllers/projects.controller');
const { authenticate, authorizeOrganizer } = require('../middlewares/auth.middleware');
const membersRoutes = require('./members.routes');
const { validate } = require('../middlewares/validation.middleware');
const { listProjectsRules } = require('../validators/projectQuery.validator');

const router = express.Router();

router.get('/', authenticate, validate(listProjectsRules), controller.listProjects);
router.post('/', authenticate, controller.createProject);
router.get('/:id', authenticate, controller.getProject);
router.put('/:id', authenticate, authorizeOrganizer, controller.updateProject);
router.delete('/:id', authenticate, authorizeOrganizer, controller.deleteProject);

router.use('/:id/members', authenticate, membersRoutes);

module.exports = router;
