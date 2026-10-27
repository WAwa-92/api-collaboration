const store = require('../data/store');
const HttpError = require('../utils/httpError');

let nextMemberId =
    Math.max(0, ...store.projects.flatMap((p) => p.members.map((m) => m.id))) + 1;

function findProject(projectId) {
    const project = store.projects.find((p) => p.id === projectId);
    if (!project) throw new HttpError(404, 'Project not found');
    return project;
}

function findMember(project, memberId) {
    const member = project.members.find((m) => m.id === memberId);
    if (!member) throw new HttpError(404, 'Member not found');
    return member;
}

exports.list = (projectId) => findProject(projectId).members;

exports.create = (projectId, { name, role }) => {
    const project = findProject(projectId);
    const member = { id: nextMemberId++, name, role, projectId };
    project.members.push(member);
    return member;
};

exports.update = (projectId, memberId, { name, role }) => {
    const member = findMember(findProject(projectId), memberId);
    if (name !== undefined) member.name = name;
    if (role !== undefined) member.role = role;
    return member;
};

exports.remove = (projectId, memberId) => {
    const project = findProject(projectId);
    const member = findMember(project, memberId);
    project.members = project.members.filter((m) => m.id !== member.id);
};