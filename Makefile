
#
# Environment.
#

NODE ?= node --harmony-generators

#
# Binaries.
#

BIN := ./node_modules/.bin
MOCHA := $(BIN)/mocha --harmony-generators
ESLINT := $(BIN)/eslint

#
# Test.
#

test: | node_modules
	@$(MOCHA)

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
