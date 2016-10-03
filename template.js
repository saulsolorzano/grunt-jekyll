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
				"grunt": "~0.4.5",
				"grunt-autoprefixer": "latest",
				"grunt-browser-sync": "^2.0.0",
				"grunt-contrib-clean": "latest",
				"grunt-contrib-compress": "latest",
				"grunt-contrib-concat": "latest",
				"grunt-contrib-connect": "latest",
				"grunt-contrib-copy": "latest",
				"grunt-contrib-csslint": "latest",
				"grunt-contrib-imagemin": "latest",
				"grunt-contrib-jshint": "latest",
				"grunt-contrib-uglify": "latest",
				"grunt-contrib-watch": "latest",
				"grunt-jekyll": "0.4.2",
				"grunt-sass": "latest",
				"grunt-sassyclean": "^0.1.5",
				"grunt-shell": "1.1.1",
				"grunt-svgstore": "^0.5.0",
				"grunt-usemin": "latest",
				"matchdep": "latest"
			}
		});

		done();

	});

};