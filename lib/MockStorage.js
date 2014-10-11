/**
 * @class AbstractStorage
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 4:09 PM
 */
var dash = require('lodash');

var MockStorage = function(data) {
    'use strict';

    var storage = this,
        data = data || {};

    this.key = function(key) {
        return data[ key ];
    };

    this.setItem = function(key, value) {
        data[ key ] = value;
        storage.length = dash.size( data );
    };

    this.getItem = function(key) {
        return data[ key ];
    };

    this.clear = function() {
        var keys = dash.keys( data );
        keys.forEach(function(key) {
            delete data[ key ];
        });
        storage.length = 0;
    };

    this.length = dash.size( data );

    this.__protected = function() {
        return {
            data:data
        };
    };
};

module.exports = MockStorage;