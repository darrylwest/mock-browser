/**
 * @class MockBrowser
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/8/14 6:47 PM
 */
var dash = require('lodash' ),
    JSDOM = require('jsdom' ).JSDOM,
    AbstractBrowser = require('../lib/AbstractBrowser' ),
    MockStorage = require('../lib/MockStorage');

var MockBrowser = function(options) {
    'use strict';

    var win, opts;

    if (!options) {
        options = {};
    }

    if (options.window) {
        // user has already created a jsdom window with document.
        win = options.window;
    }
    else
    {
        var doc = new JSDOM('<!DOCTYPE html><html><body></body></html>', {url: "http://localhost"});
        win = doc.window;
    }

    if (!win.localStorage) {
        (win).localStorage = options.localStorage || new MockStorage();
    }

    if (!win.sessionStorage) {
        (win).sessionStorage = options.sessionStorage = new MockStorage();
    }

    opts = dash.clone( options );
    opts.window = win;

    AbstractBrowser.extend( this, opts );
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
