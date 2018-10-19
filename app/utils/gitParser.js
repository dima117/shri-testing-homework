function parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');
    return {
        hash,
        author,
        timestamp,
        msg
    };
}


function parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');
    // console.log(line,{type, hash, path});
    return {type, hash, path};
}


module.exports = {
    parseFileTreeItem,
    parseHistoryItem
};
