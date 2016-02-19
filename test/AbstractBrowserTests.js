/**
 * @class AbstractBrowserTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 9:32 AM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    jsdom = require('jsdom' ).jsdom,
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockStorage = require('../lib/MockStorage' ),
    AbstractBrowser = require('../lib/AbstractBrowser');

describe('AbstractBrowser', function() {
    'use strict';

    var createOptions = function() {
        var opts = {},
            doc = jsdom('<div />' ),
            win = doc.defaultView;

        opts.window = win;
        opts.localStorage = new MockStorage();
        opts.sessionStorage = new MockStorage();

        return opts;
    };

    var createMethodNames = function() {
        var methods = [
            'getDocument',
            'getWindow',
            'getHistory',
            'getLocation',
            'getNavigator',
            'getLocalStorage',
            'getSessionStorage'
        ];

        return methods;
    };

    describe('#instance', function() {
        var browser = new AbstractBrowser( createOptions() ),
            methods = createMethodNames();

        it('should create an instance of Browser', function() {
            should.exist( browser );
            browser.should.be.instanceof( AbstractBrowser );
        });

        it('should have all known methods by size and type', function() {
            dash.functionsIn( browser ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                browser[ method ].should.be.a( 'function' );

                var obj = browser[ method ]();
                should.exist( obj );
            });
        });
    });

    describe('#api', function() {
        var browser = new AbstractBrowser( createOptions() );

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

    describe('extends', function() {
        var Browser = function(options) {
            var browser = this;

            AbstractBrowser.extend( this, options );

            this.createLogger = MockLogger.createLogger;
        };

        it('should create an extended version of abstract browser', function() {
            var browser = new Browser( createOptions() ),
                methods = createMethodNames();

            // add in the extra method
            methods.push( 'createLogger' );

            should.exist( browser );
            browser.should.be.instanceof( Browser );

            dash.functionsIn( browser ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                browser[ method ].should.be.a( 'function' );

                var obj = browser[ method ]('anything');
                should.exist( obj );
            });
        });
    });
});
