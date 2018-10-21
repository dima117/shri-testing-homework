const { resolve } = require("path");
const REPO = resolve(".");

const { execFile } = require("child_process");

function executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
        execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
            if (err) {
                reject(err);
            }

            resolve(stdout.toString());
        });
    });
}

function parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split("\t");

    return {
        hash,
        author,
        timestamp,
        msg
    };
}

// Рефакторим функцию, переносим парсинг строки в новый метод parseGitHistory()
// для того, чтобы застабить executeGit в тестах
function gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return executeGit("git", [
        "log",
        "--pretty=format:%H%x09%an%x09%ad%x09%s",
        "--date=iso",
        "--skip",
        offset,
        "-n",
        size
    ]).then(data => parseGitHistory(data));
}

function parseGitHistory(data) {
    return data
        .split("\n")
        .filter(Boolean)
        .map(parseHistoryItem);
}

function parseFileTreeItem(line) {
    const [info, path] = line.split("\t");
    const [, type, hash] = info.split(" ");

    return { type, hash, path };
}

// Рефакторим функцию, переносим парсинг строки в новый метод parseGitHistory()
// для того, чтобы застабить executeGit в тестах
function gitFileTree(hash, path) {
    const params = ["ls-tree", hash];
    path && params.push(path);

    return executeGit("git", params).then(data => parseGitFileTree(data));
}

function parseGitFileTree(data) {
    return data
        .split("\n")
        .filter(Boolean)
        .map(parseFileTreeItem);
}

function gitFileContent(hash) {
    return executeGit("git", ["show", hash]);
}

module.exports = {
    gitHistory,
    parseGitHistory,
    gitFileTree,
    parseGitFileTree,
    gitFileContent
};
