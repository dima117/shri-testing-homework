const { Git } = require("../utils/git");
const { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");

const ELEMENTS_ON_PAGE = 20;
const CURRENT_PAGE = 1;

module.exports = function(req, res, next) {
	return Git.getHistory(CURRENT_PAGE, ELEMENTS_ON_PAGE)
		.then((history) => {
			const list = history.map((item) => ({
				...item,
				href: buildFolderUrl(item.hash)
			}));

			res.render("index", {
				title: "history",
				breadcrumbs: buildBreadcrumbs(),
				list
			});
		})
		.catch((err) => next(err));
};
