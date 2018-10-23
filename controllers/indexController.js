const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

// Добавлен async / await + добавлены стабы
module.exports = async function(req, res, next, ...stubs) {
	const getHistory = stubs[0] ? stubs[0] : gitHistory;

	// Добавление к объекту ключа href с ссылкой
	const list = await getHistory(1, 20).then(
		history => {
			return history.map(item => ({
				...item,
				href: buildFolderUrl(item.hash, '')
			}));
		},
		err => next(err)
	);

	res.render('index', {
		title: 'history',
		breadcrumbs: buildBreadcrumbs(),
		list
	});
};