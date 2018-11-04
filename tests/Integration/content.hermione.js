const assert = require('chai').assert;
const URL = 'http://localhost:3000';

describe('Check elements on file content page', function() {
    it('Should view breadcrumbs', function() {
        return this.browser
            .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/README.md')
            .assertView('content-breadcrumbs', '.breadcrumbs');
    });

    it('Should view file content', function() {
        return this.browser
            .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/README.md')
            .assertView('file-content', '.file-content');
    });
});