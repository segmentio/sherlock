
#
# Environment.
#

NODE ?= n use 0.11.13 --harmony-generators

#
# Server.
#

server: | node_modules
	@$(NODE) ./bin/server

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

.PHONY: server
.PHONY: clean