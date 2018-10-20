const { Git } = require("../utils/git");
const { buildBreadcrumbs } = require("../utils/navigation");

module.exports = function(req, res, next) {
	const { hash } = req.params;
	const path = req.params[0].split("/").filter(Boolean);

	return Git.getFileTree(hash, path.join("/"))
		.then(([file]) => {
			if (file && file.type === "blob") {
				return Git.getFileContent(file.hash);
			}
		})
		.then(content => {
			if (content) {
				res.render("content", {
					title: "content",
					breadcrumbs: buildBreadcrumbs(hash, path.join("/")),
					content
				});
			} else {
				next();
			}
		})
		.catch(err => next(err));
};
