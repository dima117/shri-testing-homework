const { assert } = require("chai");
describe('Простой интеграционный тест', ()=>{
  it('Должно все заработать', function(){
    return this.browser
    .url('/')
    .isExisting('.breadcrumbs')
    .then((exist)=>{
      assert.ok(exist, 'существует')
    })
  })
})