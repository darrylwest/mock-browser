/**
 * module exports
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 10/10/14 10:14 AM
 */
module.exports = {
    delegates:{
        Browser: require( './lib/Browser' )
    },
    mocks: {
        MockBrowser: require( './lib/MockBrowser' )
    }
};

