
all:
	@make test

npm:
	@( npm install )

jshint:
	@( [ -d node_modules ] || make npm )
	@( node_modules/.bin/gulp jshint )

test:
	@( [ -d node_modules ] || make npm )
	@( node_modules/.bin/gulp test )

watch:
	@( gulp watch )

docs:
	@( gulp jsdoc )

.PHONY: jshint
.PHONY: npm
.PHONY: test
.PHONY: watch
.PHONY: build
.PHONY: docs
