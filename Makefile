MOCHA_OPTS= --check-leaks
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--globals setImmediate,clearImmediate \
		$(MOCHA_OPTS) \
		test/test-*.js

clean: clean-docs

clean-docs:
	rm -rf docs/
	rm man/*.html
	rm man/angular-file-uploader.3

manpages: clean-docs
	ronn man/*.ronn

docs: clean-docs
	docco --layout linear {index.js,lib/*.js}
	git subtree split --prefix docs -b gh-pages

publish-docs: docs
	git subtree push --prefix docs github gh-pages

publish:
	git push github --all; git push github --tags; git push bitbucket --all; git push bitbucket --tags
	npm publish

.PHONY: test
