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

    it('should have content with commits and commits should have 3 lines of info', function () {
        return this.browser
            .url('/')//get content
            .isExisting('.content .commit')
            .then((exists) => {
                expect(exists).to.be.true;
            });
            // .getText('.commit')
            // .then((commits) => {
            //     let result = commits.every(commit => commit.split('\n').length === 3);
            //     console.log(commits,result);
            //     expect(result).to.be.true;
            // });
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

    ///////////
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

    const COMMIT_HASH = 'cc2284293758e32c50fa952da2f487c8c5e8d023',
        URL = `/files/${COMMIT_HASH}/`;

    it('should have HISTORY/ROOT breadcrumb', function () {
        return this.browser
            .url(URL)
            .getText('.breadcrumbs')
            .then((value) => {
                expect(value.split(' ').join('')).to.be.equal('HISTORY/ROOT');
            });
    });

///////////
    it('should have list of files', function () {
        return this.browser
            .url(URL)
            .getText('.content ul li')
            .then((files) => {
                expect(files).to.be.an('array');
            });
    });
///////////
    it('should have link to file', async function () {
        let link;
        await this.browser
            .url(URL)
            .getText('.content a').then((commits) => {
                link = `/content/${COMMIT_HASH}/${commits[0]}`;
            });
        return this.browser.url(link).getText('.container')
            .then(text => {
                expect(text.includes('404')).to.be.false;
            });
    });

    it('should return to history page via breadcrumb', function () {
        return this.browser
            .url(URL)
            .getHTML('.breadcrumbs a')
            .then((text) => {
                expect(text.match(/href="\/"/)[0]).not.to.be.equal("");
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

    it('should return to history page via breadcrumb', function () {
        return this.browser
            .url(URL)
            .getHTML('.breadcrumbs a')
            .then((text) => {
                expect(text[0].match(/href="\/"/)[0]).not.to.be.equal("");
            });
    });

    it('should return to commit page via breadcrumb', async function () {
        let parentUrl;
        await this.browser
            .url(URL)
            .getHTML('.breadcrumbs a')
            .then((text) => {
                parentUrl = text[1].match(/\/*\w*\/\w*\/*/)[0];
            });
        return this.browser.url(parentUrl).getText('.container')
            .then(text => {
                expect(text.includes('404')).to.be.false;
            });
    });
});