const store = require('../data/store');

function listProjects(_req, res) {
  return res.status(200).json({ items: store.projects });
}

function createProject(_req, res) {
  // Placeholder: implemented in lot "Projects + upload"
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
