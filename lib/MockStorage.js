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

    this.key = function(index) {
        var key = keylist[index];
        if (dash.isUndefined(key)) {
          return null;
        }
        return key;
    };

    this.setItem = function(key, value) {
        if (!dash.includes(keylist, key)) keylist.push(key);
        data[ key ] = value;
        storage.length = dash.size( data );
    };

    this.getItem = function(key) {
        return data[ key ];
    };

    this.removeItem = function(key) {
      delete data [ key ];
      keylist = dash.without( keylist, key );
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
