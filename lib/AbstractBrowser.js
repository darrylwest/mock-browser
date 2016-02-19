/**
 * @class AbstractBrowser - a thin wrapper to use inside client side javascript applications rather
 * than accessing window/document/etc directly.  
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 9:31 AM
 */
var dash = require('lodash' );

var AbstractBrowser = function(options) {
    'use strict';

    var win = options.window;

    if (!win && typeof window === 'object') {
        win = window;
    }

    this.getDocument = function() {
        return win.document;
    };

    this.getWindow = function() {
        return win;
    };

    this.getHistory = function() {
        return win.history;
    };

    this.getLocation = function() {
        return win.location;
    };

    this.getLocalStorage = function() {
        return win.localStorage;
    };

    this.getSessionStorage = function() {
        return win.sessionStorage;
    };

    this.getNavigator = function() {
        return win.navigator;
    };

    // constructor validations
    if (!win) throw new Error('AbstractBrowser requires a window object');

    // complete the window object by assigning local and session storage
    if (!win.localStorage) win.localStorage = options.localStorage;
    if (!win.sessionStorage) win.sessionStorage = options.sessionStorage;
};

/**
 * extend this abstract object to a child object.
 *
 * @param child - any object
 * @param options - need to set the window object, real or mock
 * @returns the parent object
 */
AbstractBrowser.extend = function(child, options) {
    'use strict';

    var parent = new AbstractBrowser( options );


    dash.functionsIn( parent ).forEach(function(method) {
        child[ method ] = parent[ method ];
    });

    return parent;
};

module.exports = AbstractBrowser;
