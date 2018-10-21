const chai = require('chai'),
    expect = chai.expect;

const FILE_NAME = 'www';
const FILE_FOLDER = 'bin';
const COMMIT_HASH = '4379c958d31dd5e92fa753383d5a8238a6facbf7';


describe('navigation', () => {

    it('should have correct navigation by folder and files', async function () {
        let commitLink = await this.browser
            .url(`/`)
            .getAttribute('.commit .commit__link a', 'href')
            .then((links) => {
                return links[0];
            });

        let {folderLink, fileLink} = await this.browser
            .url(commitLink)
            .getAttribute('.content ul li a', 'href')
            .then((links) => {
                let folderLinks = links.find(link => link.search(/files/) !== -1);
                let fileLinks = links.find(link => link.search(/content/) !== -1);
                return {
                    folderLink: folderLinks ? folderLinks[0] : null,
                    fileLink: fileLinks ? fileLinks[0] : null
                };

            });

        return this.browser
            .url(fileLink ? fileLink : `/content/${COMMIT_HASH}/${FILE_FOLDER}/${FILE_NAME}`)
            .getHTML('.content .files-content')
            .then((text) => {
                expect(text).to.not.be.equal('');
            })
            .url(folderLink ? folderLink : `/content/${COMMIT_HASH}/${FILE_FOLDER}`)
            .getHTML('.content')
            .then((text) => {
                expect(text).to.not.be.equal('');
            });
    });

    it('should have correct breadcrumbs navigation', function () {
        return this.browser
            .url(`/content/${COMMIT_HASH}/${FILE_FOLDER}/${FILE_NAME}`)
            .getText('.breadcrumbs')
            .then((text) => {
                expect(text).to.be.equal('HISTORY / ROOT / bin / www');
            })
            .click(`a[href="/files/${COMMIT_HASH}/${FILE_FOLDER}/"]`)
            .getText('.breadcrumbs')
            .then((text) => {
                expect(text).to.be.equal('HISTORY / ROOT / bin');
            })
            .click(`a[href="/files/${COMMIT_HASH}/"]`)
            .getText('.breadcrumbs')
            .then((text) => {
                expect(text).to.be.equal('HISTORY / ROOT');
            })
            .click(`a[href="/"]`)
            .getText('.breadcrumbs')
            .then((text) => {
                expect(text).to.be.equal('HISTORY');
            })
    });

});

describe('start page content', () => {

    const URL = `/`;

    it('should have title history', function () {
        return this.browser
            .url(URL)
            .getTitle().then((title) => {
                expect(title).to.be.equal('history');
            });
    });

    it('should have content with array of commits, each commit should consist of 3 lines of info', function () {
        return this.browser
            .url(URL)//get content
            .getText('.content .commit')
            .then((commits) => {
                expect(commits).to.be.a('array');
                return commits.map(commit => commit.split('\n'));
            })
            .then((commits) => {
                let result = commits.every(commit => commit.length === 3);
                expect(result).to.be.true;
            });
    });


});

describe('commit page content', () => {

    const URL = `/files/${COMMIT_HASH}/`;

    it('should have title files', function () {
        return this.browser
            .url(URL)
            .getTitle().then((title) => {
                expect(title).to.be.equal('files');
            });
    });

    it('should have list of files/folders with links to their content', function () {
        return this.browser
            .url(URL)
            .getHTML('.content ul li')
            .then((files) => {
                expect(files).to.be.an('array');
                return files;
            })
            .then((files) => {
                expect(files.every(file => file.search(/<a href="(\/content)|(\/files)\/\w*\/\w*/) !== -1)).to.be.true;
            });
    });

});

describe('file description', () => {

    const URL = `/content/${COMMIT_HASH}/${FILE_FOLDER}/${FILE_NAME}`;

    it('should have title content', function () {
        return this.browser
            .url(URL)
            .getTitle().then((title) => {
                expect(title).to.be.equal('content');
            });
    });

    it('should have content of file', function () {
        return this.browser
            .url(URL)
            .getHTML('.file-content')
            .then((text) => {
                expect(text).to.include('Module dependencies');
            });
    });


});