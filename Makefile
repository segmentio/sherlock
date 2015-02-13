
#
# Environment.
#

NODE ?= n use 0.11.13 --harmony-generators

#
# Binaries.
#

BIN := ./node_modules/.bin
MOCHA := $(BIN)/mocha

#
# Server.
#

server: node_modules
	@$(NODE) ./bin/server

#
# Test.
#

test: node_modules
	@pkill phantomjs &
	@$(MOCHA) --harmony ./test
	@pkill phantomjs &

#
# Clean.
#

clean:
	@rm -rf node_modules

#
# Node Modules.
#

node_modules: package.json
	@npm install

#
# Phonies.
#

.PHONY: test
.PHONY: server
.PHONY: clean
