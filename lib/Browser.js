/**
 * @class Browser
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 9:31 AM
 */
var dash = require('lodash');

var Browser = function(options) {
    'use strict';

    var instance = this,
        win = options.window;

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
};

module.exports = Browser;
