const { config } = require('../config');

function cacheResponse(res, seconds) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
    console.log(`DEV: ${config.dev} - START: ${config.start}`);
    // if (config.start === "production") {
    //     res.set('Cache-Control', `public, max-age=${seconds}`);
    //     console.log('si');
    // } else {
    //     console.log('no');
    //     res.set('Cache-Control', `public, max-age=${seconds}`);
    // }
}

module.exports = cacheResponse;