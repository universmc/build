all: index.html style.css scripts.js server.json

index.html: style.css scripts.js
	@echo "Building index.html..."

style.css:
	@echo "Building style.css..."

scripts.js:
	@echo "Building scripts.js..."

server.json:
	@echo "Building server.json..."

watch:
	while true; do \
	        make all; \
	        sleep 1; \
	done