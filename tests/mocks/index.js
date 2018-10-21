function gitHistory() {
       return {
           value: `172001aeb63bdfc4e3f01f29e30876022cf6ad45	Dmitry Andriyanov	2018-10-16 09:02:52 +0300	список файлов`
           ,
           assert: [
               {
                   "hash": "172001aeb63bdfc4e3f01f29e30876022cf6ad45",
                   "author": "Dmitry Andriyanov",
                   "timestamp": "2018-10-16 09:02:52 +0300",
                   "msg": "список файлов"
               },
           ]
       }
}

function gitFileTree() {
    return {
        value: `100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8	.gitignore`,
        assert: [{
            hash: "b512c09d476623ff4bf8d0d63c29b784925dbdf8",
            path: ".gitignore",
            type: "blob"
        }]

    }
}


module.exports = {
    gitHistory: gitHistory(),
    gitFileTree: gitFileTree(),
};