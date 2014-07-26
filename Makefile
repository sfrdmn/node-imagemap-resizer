export PATH := $(shell npm bin):$(PATH)

bundle_example:
	browserify example/main.js > example/bundle.js

test:
	testling | tap-colorize

example: bundle_example
	node example/server.js

.PHONY: test example
