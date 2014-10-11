/**
 * @class MockBrowserTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 5:02 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockBrowser = require('../lib/MockBrowser');

describe('MockBrowser', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('MockBrowser');

        return opts;
    };

    describe('#instance', function() {
        var storage = new MockBrowser( createOptions() ),
            methods = [
                'getDocument',
                'getWindow',
                'getHistory',
                'getLocation',
                'getLocalStorage',
                'getSessionStorage'
            ];

        it('should create an instance of MockStorage', function() {
            should.exist( storage );
            storage.should.be.instanceof( MockBrowser );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( storage ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                storage[ method ].should.be.a( 'function' );
            });
        });
    });
});
