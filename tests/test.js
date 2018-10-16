const { expect } = require('chai');  // Using Expect style
const { gitHistory } = require('../utils/git');

it('should be string', async function() {
    const result = await gitHistory();
    expect(result).to.equal([1,2,3]);
})