export PATH := $(shell npm bin):$(PATH)

bundle_example:
	browserify example/main.js > example/bundle.js

test:
	testling | tap-colorize

example: bundle_example
	node example/server.js

publish:
	git subtree split -P example/ -b gh-pages
	git push origin gh-pages

.PHONY: test example
