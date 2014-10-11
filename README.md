#Mock Browser
- - -

[![Build Status](https://travis-ci.org/darrylwest/mock-browser.svg?branch=master)](https://travis-ci.org/darrylwest/mock-browser)
[![Dependency Status](https://david-dm.org/darrylwest/mock-browser.svg)](https://david-dm.org/darrylwest/mock-browser)

## Overview

A mock browser with window, document, location, navigation, local and session storage to use for client side code tests in a node environment.  The majority of the implementation is from the [jsdom project](https://github.com/tmpvar/jsdom).

## Installation

~~~
    npm install mock-browser --save
~~~

## Use

### Mock Browser

The use case is you have a browserify client project and unit tests need to provide a mechanism for client modules to access the window, document, location, etc.  The best way to simulate this is to use a proxy wall between the normally global browser objects a require the application to get instances of window, document, etc.  That way you can supply a mock for all of these objects with a common interface (AbstractBrowser).  It looks like this...

~~~
	var MockBrowser = require('mock-browser').mocks.MockBrowser;
	var mock = new MockBrowser();
    
    // and in the run-code
    
    var doc = mock.getDocument();
    var div = doc.createElement('div');
    
    var localStorage = doc.getLocalStorage();
    localStorage.setItem('mykey', 'my value');
    assert localStorage.getItem('mykey') === 'my value';
~~~

### Abstract Browser

The AbstractBrowser object can be used as an interface for run-time client apps to access browser window related objects.  This approach enables code to be used both in and outside the browser.

~~~
	var AbstractBrowser = require('mock-browser').delegates.AbstractBrowser;
    
	// configure in some factory
	var opts = {};
    opts.window = (typeof window === 'object') ? window : MockBrowser.createWindow();
    
    // create the browser object with a real window in brwosers and mock when not in browser
	var browser = new AbstractBrowser( opts );
    
    var doc = browser.getDocument();
    var element = doc.getElementById('my-dom-element');
~~~

### Abstract Browser API

* getDocument()
* getWindow()
* getLocation()
* getHistory()
* getLocalStorage()
* getSessionStorage()

These methods are inherited by MockBrowser.

### Extending AbstractBrowser

For run-time use you can extend AbstractBrowser to inherit the API.  This enables attaching other object to the browser object rather than using globals.

~~~
	var AbstractBrowser = require('mock-browser').delegates.AbstractBrowser;
    
    var MyBrowser = function(options) {
    	var browser = this,
        	builder = options.componentBuilder;
        
        // inherit getWindow(), getDocument(), getLocation(), getHistory(),
        // getLocalStorage(), getSessionStorage()
        AbstractBrowser.extend( this, options );
        
        // my browser API extension...
        this.getComponentBuilder = function() {
        	return builder;
        };
    };
~~~

### Mock Storage

The MockStorage object is used to mock out local and session storage.  When  used with mock browser, they are attached to the window object and can be accessed from AbstractBrowser instances by invoking getLocalStorage() or getSessionStorage().

This object may also be used standalone when you just need to mock out either local or session storage.  It looks like this:

~~~
	var MockStorage = require('mock-browser').mocks.MockStorage;
    
    var storage = new MockStorage();
    
    storage.setItem( 'mykey', 'my string value' );
    assert storage.getItem( 'mykey' ) === 'my string value';
    
    assert storage.length === 1;
~~~

## Tests

All objects are tested using mocha.  You can run tests by doing this:

~~~
	make test
    
    // or
    
    npm test
~~~

- - -
<p><small><em>copyright © 2014 rain city software | version 0.90.10</em></small></p>
