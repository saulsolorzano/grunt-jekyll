exports.description = 'Crea un sitio con Jekyll';

exports.template = function( grunt, init, done ) {

	init.process({}, [

		init.prompt('name'),
		init.prompt('title'),
		init.prompt('description'),
		init.prompt('production_url'),
		init.prompt('development_url',''),
		init.prompt('version'),
		init.prompt('author_name', 'Agencia Digital Reactor'),
		init.prompt('author_email', 'contacto@reactor.cl'),
		init.prompt('author_twitter', '@reactorhq'),
		init.prompt('author_url', 'http://reactor.cl/')

	], function(err, props){

		var files = init.filesToCopy(props);

		init.copyAndProcess(files, props);

		init.writePackageJSON('package.json', {
			name: props.name,
			version: props.version,
			description: props.description,
			author: {
				name: props.author_name,
				url: props.author_url
			},
			devDependencies: {
				"grunt": "^1.0.1",
				"grunt-autoprefixer": "^3.0.4",
				"grunt-browser-sync": "^2.2.0",
				"grunt-contrib-clean": "^1.0.0",
				"grunt-contrib-compress": "^1.3.0",
				"grunt-contrib-concat": "^1.0.1",
				"grunt-contrib-connect": "^1.0.2",
				"grunt-contrib-copy": "^1.0.0",
				"grunt-contrib-csslint": "^2.0.0",
				"grunt-contrib-imagemin": "^1.0.1",
				"grunt-contrib-jshint": "^1.0.0",
				"grunt-contrib-uglify": "^2.0.0",
				"grunt-contrib-watch": "^1.0.0",
				"grunt-jekyll": "^0.4.4",
				"grunt-sass": "^1.2.1",
				"grunt-sassyclean": "^0.1.8",
				"grunt-shell": "^2.0.0",
				"grunt-svgstore": "^1.0.0",
				"grunt-usemin": "^3.1.1",
				"matchdep": "^1.0.1"
			}
		});

		done();

	});

};