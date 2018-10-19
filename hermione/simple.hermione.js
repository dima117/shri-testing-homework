const chai = require('chai'),
    expect = chai.expect;

describe('start page', () => {
    it('should have HISTORY breadcrumb', function () {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then((value) => {
                expect(value).to.be.equal('HISTORY');
            });
    });

    it('should have content with commits', function () {
        return this.browser
            .url('/')//get content
            .isExisting('.content .commit')
            .then((exists) => {
                expect(exists).to.be.true;
            });
    });

    it('should have commits with 3 lines of info', function () {
        return this.browser
            .url('/')//get content
            .getText('.commit')
            .then((commits) => {
                let result = commits.every(commit => commit.split('\n').length === 3);
                expect(result).to.be.true;
            });
    });

    it('should have link to commit', async function () {
        let link;
        await this.browser
            .url('/')
            .getText('.commit__link a').then((commits) => {
                link = `/files/${commits[0]}/`;
            });

        return this.browser.url(link).getText('.container')
            .then(text => {
                expect(text.includes('404')).to.be.false;
            });
    });
});

describe('commit page', () => {

    const COMMIT_HASH = 'cc2284293758e32c50fa952da2f487c8c5e8d023';

    it('should have HISTORY/ROOT breadcrumb', function () {
        return this.browser
            .url(`/files/${COMMIT_HASH}/`)
            .getText('.breadcrumbs')
            .then((value) => {
                expect(value.split(' ').join('')).to.be.equal('HISTORY/ROOT');
            });
    });


    it('should have list of files', function () {
        return this.browser
            .url(`/files/${COMMIT_HASH}/`)
            .getText('.content ul li')
            .then((files) => {
                expect(files).to.be.an('array');
            });
    });

    it('should have link to file', async function () {
        let link;
        await this.browser
            .url(`/files/${COMMIT_HASH}/`)
            .getText('.content a').then((commits) => {
                link = `/content/${COMMIT_HASH}/${commits[0]}`;
            });
        return this.browser.url(link).getText('.container')
            .then(text => {
                expect(text.includes('404')).to.be.false;
            });
    });
});

describe('file description', () => {

    const COMMIT_HASH = 'cc2284293758e32c50fa952da2f487c8c5e8d023',
        FILE_NAME = 'README.md',
        URL = `/content/${COMMIT_HASH}/${FILE_NAME}`;

    it('should have HISTORY/ROOT/%filename breadcrumb', function () {
        return this.browser
            .url(URL)
            .getText('.breadcrumbs')
            .then((value) => {

                expect(value.split(' ').join('')).to.be.equal(`HISTORY/ROOT/${FILE_NAME}`);
            });
    });


    it('should have content of file', function () {
        return this.browser
            .url(URL)
            .getText('.content')
            .then((text) => {
                expect(text).to.include('автотесты');
            });
    });


});