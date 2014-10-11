/**
 * @class AbstractStorageTests
 *
 * @author: darryl.west@roundpeg.com
 * @created: 10/10/14 4:12 PM
 */
var should = require('chai').should(),
    dash = require('lodash' ),
    MockLogger = require('simple-node-logger' ).mocks.MockLogger,
    MockStorage = require('../lib/MockStorage');

describe('MockStorage', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('MockStorage');

        return opts;
    };

    describe('#instance', function() {
        var storage = new MockStorage( createOptions() ),
            methods = [
                'getItem',
                'setItem',
                'length',
                'clear',
                'key'
            ];

        it('should create an instance of MockStorage', function() {
            should.exist( storage );
            storage.should.be.instanceof( MockStorage );
        });

        it('should have all known methods by size and type', function() {
            dash.methods( storage ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                storage[ method ].should.be.a( 'function' );
            });
        });
    });
});
