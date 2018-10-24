const buildBreadcrumbs = require('./build-bread-crumbs')

const IO = [{
    args: [],
    output: [ { text: 'HISTORY', href: undefined } ]
  }, {
    args: ['aeb66fdb387ac05897a0344a2b72ed8d3f538641', ''],
    output: [ 
      { text: 'HISTORY', href: '/' },
      { text: 'ROOT', href: undefined } 
    ]
  }, {
    args: ['aeb66fdb387ac05897a0344a2b72ed8d3f538641', 'bin'],
    output: [ 
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT', href: '/files/aeb66fdb387ac05897a0344a2b72ed8d3f538641/' },
        { text: 'bin' } 
      ]
  }
]

it('builds breadcrumbs correctly', () => {
  IO.map(io => expect(buildBreadcrumbs(...io.args)).toEqual(io.output))
})
