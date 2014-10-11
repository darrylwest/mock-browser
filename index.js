/**
 * module exports
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 10/10/14 10:14 AM
 */
module.exports = {
    delegates:{
        AbstractBrowser: require( './lib/AbstractBrowser' )
    },
    mocks: {
        MockBrowser: require( './lib/MockBrowser' ),
        MockStorage: require( './lib/MockStorage' )
    }
};

