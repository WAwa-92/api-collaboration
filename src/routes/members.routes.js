const express = require('express');
const controller = require('../controllers/members.controller');

const router = express.Router({ mergeParams: true });

router.get('/', controller.listMembers);
router.post('/', controller.addMember);
router.put('/:memberId', controller.updateMember);
router.delete('/:memberId', controller.deleteMember);

module.exports = router;
