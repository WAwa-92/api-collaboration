const express = require('express');
const controller = require('../controllers/members.controller');
const { authorizeOrganizer } = require('../middlewares/auth.middleware');

const router = express.Router({ mergeParams: true });

router.get('/', controller.listMembers);
router.post('/', authorizeOrganizer, controller.addMember);
router.put('/:memberId', authorizeOrganizer, controller.updateMember);
router.delete('/:memberId', authorizeOrganizer, controller.deleteMember);

module.exports = router;
