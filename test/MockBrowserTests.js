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
        var browser = new MockBrowser(),
            methods = [
                'getDocument',
                'getWindow',
                'getHistory',
                'getLocation',
                'getLocalStorage',
                'getSessionStorage'
            ];

        it('should create an instance of MockBrowser', function() {
            should.exist( browser );
            browser.should.be.instanceof( MockBrowser );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( browser ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                browser[ method ].should.be.a( 'function' );

                var obj = browser[ method ]();
                should.exist( obj );
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

    describe('createDocument', function() {
        it('should create a dom document', function() {
            var doc = MockBrowser.createDocument();

            should.exist( doc );
            doc.createElement.should.be.a('function');
        });
    });

    describe('#classList', function() {
        var browser = new MockBrowser(),
            document = browser.getDocument();

        it('should add a single class name to the class list', function() {
            var element = document.createElement('div' ),
                cname = 'enabled';

            element.className.should.equal( '' );
            element.classList.add( cname );
            element.className.should.equal( cname );

            // even when an attempt is made to add this multiple times, it's only added once
            element.classList.add( cname );
            element.className.should.equal( cname );
        });

        it('should remove the class name from the class list', function() {
            var element = document.createElement('div' ),
                cname = 'disabled';

            element.className = [ cname, 'flarb', cname, 'mashooka' ].join(' ');
            element.classList.contains( cname ).should.equal( true );
            element.classList.remove( cname );

            element.classList.contains( cname ).should.equal( false );
        });
    });

    describe('createWindow', function() {
        it('should create a browser window', function() {
            var win = MockBrowser.createWindow();

            should.exist( win );
            should.exist( win.localStorage );
            should.exist( win.sessionStorage );
            should.exist( win.document );
            should.exist( win.history );
            should.exist( win.location );
        });
    });
});
