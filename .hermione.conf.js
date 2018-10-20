module.exports = {
    baseUrl: 'http://localhost:3000',
    gridUrl: 'http://0.0.0.0:4444/wd/hub',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }, 
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }
    }
}
 
// module.exports = {
//     baseUrl: 'http://localhost:3000',
//     //baseUrl: 'http://yandex.ru',
//     gridUrl: 'http://0.0.0.0:4444/wd/hub/static/resource/hub.html',

//     browsers: {
//         chrome: {
//             desiredCapabilities: {
//                 browserName: 'chrome'
//             }
//         }
//         // , 
//         // firefox: {
//         //     desiredCapabilities: {
//         //         browserName: 'firefox'
//         //     }
//         // }
//     }
//     // ,
//     // plugins: {
//     //     'html-reporter/hermione': {
//     //         path: 'hermione-html-report'
//     //     }
//     // }
// }
