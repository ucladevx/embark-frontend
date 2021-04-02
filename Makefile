all: format

format:
	npx prettier --write --arrow-parens always --single-quote --trailing-comma all "src/**/*.js"