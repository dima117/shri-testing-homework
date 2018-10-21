const buildFolderUrl = jest.fn(() => '/ffiles/90180910fc27a11272a3e5caeeb119a51e5c0545/');

const buildBreadcrumbs = jest.fn(() => [{
        text: 'HISTORY',
        href: '/'
    },
    {
        text: 'ROT',
        href: '/files/e95b197aef0941e12e970da042afd4c2b1488225/'
    },
    {
        text: 'package.json'
    }
]);

module.exports = {
    buildFolderUrl,
    buildBreadcrumbs
}