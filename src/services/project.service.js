const store = require('../data/store');

exports.list = ({ q, role, page = 1, size = 10 }) => {
    let projects = store.projects;
    if (q) {
        const search = q.toLowerCase();
        projects = projects.filter((p) => p.name.toLowerCase().includes(search));
    }
    if (role) {
        const wanted = role.toLowerCase();
        projects = projects.filter((p) => p.members.some((m) => m.role.toLowerCase() === wanted));
    }
    const total = projects.length;
    const start = (page - 1) * size;
    const items = projects.slice(start, start + size).map((p) => ({
        id: p.id,
        name: p.name,
        organizer: p.organizer,
        membersCount: p.members.length
    }));
    return { items, page, size, total };
};