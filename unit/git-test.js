const { expect } = require('chai');
const Git = require('../utils/git');
const { historyStub, fileTreeStub } = require('./stubs/git');

it('запрашивая историю git с указанием всех аргументов, получаем массив', async () => {
    const git = new Git();

    git.executeGit = () => {
        return Promise.resolve(historyStub);
    };

    await git.gitHistory(1, 20).then(() => {
        expect(git.history).to.be.an('array');
    });
});

it('запрашивая историю git с указанием всех аргументов, получаем массив с корректными данными', async () => {
    const git = new Git();

    git.executeGit = () => {
        return Promise.resolve(historyStub);
    };

    await git.gitHistory(1, 20).then(() => {
        expect(
            git.history[0].hash.length > 0 &&
            git.history[0].author.length > 0 &&
            git.history[0].timestamp.length > 0 &&
            git.history[0].msg.length > 0
        ).to.be.true;
    });
});

it('запрашивая историю git без указания аргументов, получаем массив', async () => {
    const git = new Git();

    git.executeGit = () => {
        return Promise.resolve(historyStub);
    };

    await git.gitHistory().then(() => {
        expect(git.history).to.be.an('array');
    });
});

it('запрашивая историю git без указания аргументов, получаем массив с корректными данными', async () => {
    const git = new Git();

    git.executeGit = () => {
        return Promise.resolve(historyStub);
    };

    await git.gitHistory().then(() => {
        expect(
            git.history[0].hash.length > 0 &&
            git.history[0].author.length > 0 &&
            git.history[0].timestamp.length > 0 &&
            git.history[0].msg.length > 0
        ).to.be.true;
    });
});

it('запрашивая список файлов и директорий с аргументами, получаем массив', async () => {
    const git = new Git();

    git.executeGit = () => {
        return Promise.resolve(fileTreeStub);
    };

    await git.gitFileTree('90180910fc27a11272a3e5caeeb119a51e5c0545', 'controllers/').then(() => {
        expect(git.fileTree).to.be.an('array');
    });
});

it('запрашивая список файлов и директорий с аргументами, получаем массив c корректными данными', async () => {
    const git = new Git();

    git.executeGit = () => {
        return Promise.resolve(fileTreeStub);
    };

    await git.gitFileTree('90180910fc27a11272a3e5caeeb119a51e5c0545', 'controllers/').then(() => {
        expect(
            git.fileTree[0].type.length > 0 &&
            git.fileTree[0].hash.length > 0 &&
            git.fileTree[0].path.length > 0
        ).to.be.true;
    });
});

