const getOffset = (page, size) => (page - 1) * size;

function parseHistoryItem(line) {
	const [hash, author, timestamp, msg] = line.split("\t");

	return {
		hash,
		author,
		timestamp,
		msg
	};
}

function parseFileTreeItem(line) {
	const [info, path] = line.split("\t");
	const [, type, hash] = info.split(" ");

	return { type, hash, path };
}

module.exports = {
	getOffset,
	parseHistoryItem,
	parseFileTreeItem
};
