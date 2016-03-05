/**
 * @class AbstractStorage
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 4:09 PM
 */
var dash = require('lodash');

var MockStorage = function(data) {
    'use strict';

    var storage = this;

    if (!data) data = {};

    var keylist = dash.keys(data);

    var nullOrValue = function(value) {
      return dash.isUndefined(value) ? null : value;
    };

    this.key = function(index) {
        var key = keylist[index];
        return nullOrValue(key);
    };

    this.setItem = function(key, value) {
        if (!dash.includes(keylist, key)) keylist.push(key);
        data[ key ] = value;
        storage.length = dash.size( data );
    };

    this.getItem = function(key) {
        var value = data[ key ];
        return nullOrValue(value);
    };

    this.removeItem = function(key) {
      delete data [ key ];
      keylist = dash.without( keylist, key );
      storage.length = dash.size( data );
    };

    this.clear = function() {
        var keys = dash.keys( data );
        var remove = this.removeItem;
        keys.forEach(function(key) {
            remove(key);
        });
    };

    this.length = dash.size( data );

    this.__protected = function() {
        return {
            data:data
        };
    };
};

module.exports = MockStorage;
