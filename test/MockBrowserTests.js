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

    describe('#instance', function() {
        var storage = new MockBrowser(),
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

    describe('#api', function() {
        var browser = new MockBrowser();

        it('should return a valid window object', function() {
            var obj = browser.getWindow();

            should.exist( obj );
        });

        it('should return a valid document object', function() {
            var obj = browser.getDocument();

            should.exist( obj );
        });

        it('should return a valid history object', function() {
            var obj = browser.getHistory();

            should.exist( obj );
        });

        it('should return a valid location object', function() {
            var obj = browser.getLocation();

            should.exist( obj );
        });

        it('should return a valid local storage object', function() {
            var obj = browser.getLocalStorage();

            should.exist( obj );
        });

        it('should return a valid session storage object', function() {
            var obj = browser.getSessionStorage();

            should.exist( obj );
        });
    });
});
