const { gitFileTree } = require('../utils/git');
const {
	buildFolderUrl,
	buildFileUrl,
	buildBreadcrumbs
} = require('../utils/navigation');

function buildObjectUrl(parentHash, { path, type }) {
	switch (type) {
	case 'tree':
		return buildFolderUrl(parentHash, path);
	case 'blob':
		return buildFileUrl(parentHash, path);
	default:
		return '#';
	}
}

// Добавлен async / await + добавлены стабы
// Построение строки пути из url
module.exports = async function(req, res, next, ...stubs) {
	const getFileTree = stubs[0] ? stubs[0] : gitFileTree;
	const buildObjUrl = stubs[1] ? stubs[1] : buildObjectUrl;

	const { hash } = req.params;
	const pathParam = (req.params[0] || '').split('/').filter(Boolean);

	const path = pathParam.length ? pathParam.join('/') + '/' : '';

	const files = await getFileTree(hash, path).then(
		list => {
			return list.map(item => ({
				...item,
				href: buildObjUrl(hash, item),
				name: item.path.split('/').pop()
			}));
		},
		err => next(err)
	);

	res.render('files', {
		title: 'files',
		breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
		files
	});
};