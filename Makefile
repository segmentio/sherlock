
#
# Environment.
#

NODE ?= n use 0.11.13 --harmony-generators

#
# Binaries.
#

BIN := ./node_modules/.bin
MOCHA := $(BIN)/mocha
ESLINT := $(BIN)/eslint

#
# Server.
#

server: node_modules
	@$(NODE) ./bin/server

#
# Test.
#

test: node_modules
	@$(MOCHA) --harmony ./test

#
# Clean.
#

distclean:
	@rm -rf node_modules

#
# Lint.
#

lint:
	@$(ESLINT) .

#
# Node Modules.
#

node_modules: package.json
	@npm install

#
# Phonies.
#

.PHONY: server
.PHONY: test
.PHONY: distclean
.PHONY: lint
