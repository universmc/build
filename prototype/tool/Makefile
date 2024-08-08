# Compile SCSS files
compile-scss:
	@sass --update scss:css

# Compile JS files
compile-js:
	@browserify js/app.js -o js/bundle.js

# Compile and watch for changes
watch:
	@while true; do \
		clear; \
		echo "[INFO] Compiling files..."; \
		make compile-scss && make compile-js; \
		echo "[INFO] Compilation complete."; \
		sleep 1; \
	done