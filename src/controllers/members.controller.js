const service = require('../services/member.service');
const { ok } = require('../utils/response');

function listMembers(req, res) {
  return ok(res, { members: service.list(Number(req.params.id)) });
}

function addMember(req, res) {
  const member = service.create(Number(req.params.id), req.body);
  return ok(res, { member }, 201);
}

function updateMember(req, res) {
  const member = service.update(Number(req.params.id), Number(req.params.memberId), req.body);
  return ok(res, { member });
}

function deleteMember(req, res) {
  service.remove(Number(req.params.id), Number(req.params.memberId));
  return res.status(204).end();
}

module.exports = { listMembers, addMember, updateMember, deleteMember };