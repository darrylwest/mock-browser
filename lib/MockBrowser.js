/**
 * @class MockBrowser
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/8/14 6:47 PM
 */
var dash = require('lodash' ),
    jsdom = require('jsdom' ).jsdom,
    AbstractBrowser = require('../lib/AbstractBrowser' ),
    MockStorage = require('../lib/MockStorage');

var MockBrowser = function(options) {
    'use strict';

    var doc = jsdom('<!DOCTYPE html><html><body></body></html>' ),
        win = doc.parentWindow,
        opts;

    if (!options) options = {};

    if (!win.localStorage) {
        (win).localStorage = options.localStorage || new MockStorage();
    }

    if (!win.sessionStorage) {
        (win).sessionStorage = options.sessionStorage = new MockStorage();
    }

    opts = dash.clone( options );
    opts.window = win;

    AbstractBrowser.extend( this, opts );

    // work around for un-implemented classList in jsdom
    doc.__createElement = doc.createElement;
    doc.createElement = function(tag) {
        var el = doc.__createElement( tag );

        el.classList = new ClassList( el );

        return el;
    };

    // class list work around

    var ClassList = function(elem) {

        var clist = this;

        var getList = function() {
            return elem.className.split(' ');
        };

        this.add = function(cname) {
            var list = getList();

            // don't push if it exists
            if (!dash.contains( list, cname )) {
                list.push( cname );
            }

            elem.className = list.join( ' ' ).trim();
        };

        this.remove = function(cname) {
            var list = getList().filter(function(nm) {
                if (nm !== cname) {
                    return nm;
                }
            });

            elem.className = list.join( ' ' ).trim();
        };

        this.toggle = function(cname) {
            var list = getList();

            if (list.indexOf( cname ) < 0) {
                clist.add( cname );
            } else {
                clist.remove( cname );
            }

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

MockBrowser.createWindow = function() {
    'use strict';

    var browser = new MockBrowser();

    return browser.getWindow();
};

module.exports = MockBrowser;
