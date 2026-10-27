const express = require('express');
const controller = require('../controllers/members.controller');
const { authorizeOrganizer } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const rules = require('../validators/member.validator');

const router = express.Router({ mergeParams: true });

router.get('/', validate(rules.projectIdRules), controller.listMembers);
router.post('/', authorizeOrganizer, validate(rules.createMemberRules), controller.addMember);
router.put('/:memberId', authorizeOrganizer, validate(rules.updateMemberRules), controller.updateMember);
router.delete('/:memberId', authorizeOrganizer, validate(rules.memberIdRules), controller.deleteMember);
router.patch('/:memberId', authorizeOrganizer, validate(rules.patchMemberRules), controller.updateMember);

module.exports = router;