const store = require('../data/store');

const projectService = require('../services/project.service');
const { ok } = require('../utils/response');

function listProjects(req, res) {
  const { q, role, page, size } = req.query;
  const result = projectService.list({
    q,
    role,
    page: page ? Number(page) : 1,
    size: size ? Number(size) : 10
  });
  return ok(res, result);
}

function createProject(_req, res) {
  return res.status(501).json({ message: 'Not implemented yet' });
}

function getProject(req, res) {
  const id = Number(req.params.id);
  const project = store.projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  return res.status(200).json({ project });
}

function updateProject(_req, res) {
  return res.status(501).json({ message: 'Not implemented yet' });
}

function deleteProject(_req, res) {
  return res.status(501).json({ message: 'Not implemented yet' });
}

module.exports = {
  listProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
};
