const chai = require('chai'),
    expect = chai.expect;
const { buildBreadcrumbs} = require('../../view/buildBreadcrumbs');

describe('buildBreadcrumbs', () => {

    it('should return an array', () => {

        let result = buildBreadcrumbs();
        expect(result).to.be.an('array');
    });

    it('should have 2 item while only hash provided', () => {

        const testHash = 'testHash';
        let result = buildBreadcrumbs(testHash);
        expect(result.length).to.be.equal(2);
    });
    it('should have HISTORY item with href: "/" while only hash provided', () => {

        const testHash = 'testHash';
        let result = buildBreadcrumbs(testHash);
        expect(result.some(element => element.text === 'HISTORY' && element.href === '/')).to.be.true;
    });

    it('should have ROOT item with undefined href while only hash provided', () => {

        const testHash = 'testHash';
        let result = buildBreadcrumbs(testHash);
        expect(result.some(element => element.text === 'ROOT' && element.href === undefined)).to.be.true;
    });

    it('should have 3 item while hash and path provided', () => {

        const testHash = 'testHash',
            testPath = 'testPath';
        let result = buildBreadcrumbs(testHash, testPath);
        expect(result.length).to.be.equal(3);
    });

    it('should have HISTORY item with href: "/" while hash and path provided', () => {

        const testHash = 'testHash',
            testPath = 'testPath';
        let result = buildBreadcrumbs(testHash, testPath);
        expect(result.some(element => element.text === 'HISTORY' && element.href === '/')).to.be.true;
    });

    it('should have ROOT item with href: "/files/$hash/" while hash and path provided', () => {

        const testHash = 'testHash',
            testPath = 'testPath';
        let result = buildBreadcrumbs(testHash, testPath);
        expect(result.some(element => element.text === 'ROOT' && element.href === `/files/${testHash}/`)).to.be.true;
    });

    it('should have path item while hash and path provided', () => {

        const testHash = 'testHash',
            testPath = 'testPath';
        let result = buildBreadcrumbs(testHash, testPath);
        expect(result.some(element => element.text === testPath)).to.be.true;
    });


    it('should have 1 item w/o arguments', () => {
        let result = buildBreadcrumbs();
        expect(result.length).to.be.equal(1);
    });

    it('should have HISTORY item with undefined href w/o arguments', () => {

        let result = buildBreadcrumbs();
        expect(result.some(element => element.text === 'HISTORY' && element.href === undefined)).to.be.true;
    });
});