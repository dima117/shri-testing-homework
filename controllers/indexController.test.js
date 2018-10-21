const indexController = require('./indexController');
const {
    expectetArgumentInRender
} = require('./testingContants');
const {
    buildFolderUrl,
    buildBreadcrumbs
} = require('../utils/navigation');
const {
    gitHistory
} = require('../utils/git');

jest.mock('../utils/git')
jest.mock('../utils/navigation')

const res = {
    render: jest.fn()
};

const req = jest.fn()

indexController(req, res)

test('indexController', () => {

    expect(res.render).toBeCalledTimes(1)
    expect(res.render).toBeCalledWith('index', expectetArgumentInRender)
})