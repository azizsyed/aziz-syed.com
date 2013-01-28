/*
 * build-bootstrap
 * https://github.com/jonschlinkert/build-bootstrap
 *
 * Copyright (c) 2012 Jon Schlinkert
 * Credit: inspired by @ctalkington
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {

    // Grunt utilities.
    var task = grunt.task,
        file = grunt.file,
        utils = grunt.util,
        log = grunt.log,
        verbose = grunt.verbose,
        fail = grunt.fail,
        option = grunt.option,
        config = grunt.config,
        template = grunt.template,
        _ = utils._;

    // external dependencies
    var fs = require('fs'),
        hogan = require('hogan.js');


    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

    // ==========================================================================
    // TASKS
    // ==========================================================================
    grunt.registerMultiTask('mustache', 'Compile mustache files to HTML with hogan.js', function () {

        var data = this.data,
            src = grunt.file.expandFiles(this.file.src),
            dest = grunt.template.process(data.dest),

            // Options are set in gruntfile
            defaults = {
                production: false,
                docs: false,
                title: 'Awesome Site',
                content: {},
                layout: 'docs/templates/layout.mustache',
                paths: {},
                partials: {},
                partialsData: {}
            },
            options = _.extend(defaults, this.data.options || {});

        !src && grunt.warn('Missing src property.')
        if (!src) return false;

        !dest && grunt.warn('Missing dest property')
        if (!dest) return false;

        var done = this.async();
        var srcFiles = file.expandFiles(src);
        var filenameRegex = /[^\\\/:*?"<>|\r\n]+$/i;

        //Process the partial templates
		if (options.paths.partials) {

            var partials = grunt.file.expandFiles(options.paths.partials);
            log.writeln(('\n' + 'Begin processing partials...').grey);

            partials.forEach(function (filepath) {
                var filename = _.first(filepath.match(filenameRegex)).replace(/\.mustache$/, '');

                var dataFilepath = filepath.replace(/\.mustache$/, '.json');

                var partial = fs.readFileSync(filepath, 'utf8');
                options.partials[filename] = hogan.compile(partial, {
                    sectionTags: [{
                        o: '_i',
                        c: 'i'
                    }]
                })

                // if a data file exists, read in the data
                if (fs.existsSync(dataFilepath)) {
                    options.partialsData[filename] = grunt.file.readJSON(dataFilepath);
                    log.writeln('Processing ' + filename.cyan);
                }
            });
            log.writeln('\n');
        }

        //Compile the layout template
		try {
            options.layout = fs.readFileSync(options.layout, 'utf8')
            options.layout = hogan.compile(options.layout, {
                sectionTags: [{
                    o: '_i',
                    c: 'i'
                }]
            })
        } catch (err) {
            grunt.warn(err) && done(false)
            return
        };

        log.writeln(('Build pages...').grey);

		//Grab the content config files
		var contentFiles = grunt.file.expandFiles("../../content/award_sites/*.*");
		
		grunt.helper('remove-generated-html', "../../deploy/*.html", function(){
		});
		
		var sitemap = [];
		
        contentFiles.forEach(function(configFilePath){
	        var content = grunt.file.readJSON(configFilePath, true);
	
			var configFilename = content.file_name || _.first(configFilePath.match(filenameRegex)).replace(/\.json$/, '');
	        
			//Manually set the last content element to be 'last', to help render the final separator
			var bodyLength = content.body.length;
			content.body[bodyLength-1]["last"] = true;
			
			options['content'] = content;
			
			srcFiles.forEach(function (filepath) {
	            var filename = _.first(filepath.match(filenameRegex)).replace(/\.mustache$/, '')

	            grunt.helper('hogan', filepath, filename, configFilename, options, function (err, result) {
	                err && grunt.warn(err) && done(false)
	                if (err) return

	                file.write(dest.replace('FILE', configFilename), result);
	
					sitemap.push({
						'path' : configFilename+".html",
						'name' : content.page_title
					});
	            })
	        })
		});
		
		grunt.helper('build-sitemap', sitemap, '../../content/templates/sitemap/sitemap.mustache', null, null, options, function(){
		});
		
        done();
    });

    // ==========================================================================
    // HELPERS
    // ==========================================================================
	grunt.registerHelper('remove-generated-html', function(path, callback){
		log.writeln('Clear deployed html files');
		
		//Grab all matched files per the path argument
		var htmlFiles = grunt.file.expandFiles(path);
		
		htmlFiles.forEach(function(htmlFile){
			//Remove each file
			fs.unlinkSync(htmlFile);
		});
		
		callback();
		return;
	});
	
    // ==========================================================================
    // HELPERS
    // ==========================================================================
	grunt.registerHelper('build-sitemap', function(sitemap, src, filename, configFilename, options, callback){		
		//Read in the content file
		var content = grunt.file.readJSON('../../content/sitemap-content.json', true);
		content['sitemap'] = sitemap;
		
		options.content = content;
		
		grunt.helper('hogan', src, filename, "sitemap", options, function (err, result) {
            err && grunt.warn(err) && done(false)
            if (err) return

			grunt.file.write('../../deploy/index.html', result);

			callback();
        });
	});
	
    grunt.registerHelper('hogan', function (src, filename, configFilename, options, callback) {
        log.writeln('Rendering ' + configFilename.magenta);

        var page = fs.readFileSync(src, 'utf8'),
            html = null,
            layout = options.layout,
            context = {};
        context[filename] = 'active';
        context._i = true;
        context.production = options.production;
        context.docs = options.docs;
        context.partialsData = options.partialsData;
        context.partialsData.docs = true;

        try {
            page = hogan.compile(page, {
                sectionTags: [{
                    o: '_i',
                    c: 'i'
                }]
            })

            context = _.extend(context, options.partialsData);

            context.content = options.content;

            options.partials.body = page;
            page = layout.render(context, options.partials)
            callback(null, page)
        } catch (err) {
            callback(err)
            return
        };
    });
};