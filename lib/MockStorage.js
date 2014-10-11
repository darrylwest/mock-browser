/**
 * @class AbstractStorage
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 4:09 PM
 */
var dash = require('lodash');

var MockStorage = function(options) {
    'use strict';

    var storage = this,
        log = options.log,
        data = {};

    this.key = function(key) {
        return data[ key ];
    };

    this.setItem = function(key, value) {
        data[ key ] = value;
    };

    this.getItem = function(key) {
        return data[ key ];
    };

    this.clear = function() {
        data = {};
    };

    this.length = function() {
        return dash.keys( data ).length;
    };
};

module.exports = MockStorage;