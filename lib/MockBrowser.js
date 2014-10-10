/**
 * @class MockBrowser
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/8/14 6:47 PM
 */
var dash = require('lodash' ),
    jsdom = require('jsdom' ).jsdom,
    Browser = require('./lib/Browser');

var MockBrowser = function(options) {
    'use strict';

    var mock = this,
        doc = options.doc || jsdom('<!DOCTYPE html><html><body></body></html>' ),
        win = doc.parentWindow,
        browser = options.browser || new Browser( { window:win } );

    // borrow the methods from run-time browser
    dash.methods( browser ).forEach(function(method) {
        mock[ method ] = browser[ method ];
    });

    // work around for un-implemented classList in jsdom
    doc.__createElement = doc.createElement;
    doc.createElement = function(tag) {
        var el = doc.__createElement( tag );

        el.classList = new ClassList( el );

        return el;
    };

    // class list work around

    var ClassList = function(elem) {

        var getList = function() {
            return elem.className.split(' ');
        };

        this.add = function(cname) {
            var list = getList();
            list.push( cname );
            elem.className = list.join( ' ' ).trim();
        };

        this.remove = function(cname) {
            var list = elem.className.replace( cname, '' ).trim().split( ' ' );

            elem.className = list.join( ' ' ).trim();
        };

        this.toggle = function(cname) {
            var list = getList();

            if (list.indexOf( cname ) < 0) {
                list.push( cname );
            } else {
                dash.remove( list, cname );
            }

            elem.className = list.join(' ' ).trim();

            return list.indexOf( cname ) >= 0;
        };

        this.contains = function(cname) {
            return elem.className.indexOf( cname ) >= 0;
        };

        this.toString = function() {
            return getList().toString();
        };

        this.valueOf = function() {
            return getList();
        };
    };
};

MockBrowser.createDocument = function() {
    'use strict';

    var browser = new MockBrowser();

    return browser.getDocument();
};

module.exports = MockBrowser;
