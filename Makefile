
#
# Environment.
#

NODE ?= node

#
# Binaries.
#

BIN := ./node_modules/.bin
MOCHA := $(BIN)/mocha
ESLINT := $(BIN)/eslint

#
# Test.
#

test: | node_modules
	@$(MOCHA) test/integrations.js test/index.js

#
# Lint.
#

lint: | node_modules
	@$(ESLINT) .

#
# Node Modules.
#

node_modules: package.json
	@npm install

#
# Clean.
#

distclean:
	@rm -rf node_modules

#
# Phonies.
#

.PHONY: test
.PHONY: lint
.PHONY: distclean
