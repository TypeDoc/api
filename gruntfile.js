module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');

    function getTypeDocPath() {
        var fs = require('fs');
        return fs.existsSync('./local.json') ? require('./local.json').typeDocPath : 'typedoc/src/';
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            rootfiles: {
                src: ['README.md', 'LICENCE*'],
                dest: 'dist/'
            }
        },
        'gh-pages': {
            'dist': {
                options: {
                    base: 'dist/'
                },
                src: '**/*'
            }
        }
    });

    grunt.registerTask('typedoc', function() {
        var Path = require('path');
        var TypeDoc = require('typedoc');

        var settings = new TypeDoc.Settings();
        settings.inputFiles.push(getTypeDocPath());
        settings.expandInputFiles();

        settings.out           = Path.resolve('./dist/');
        settings.name          = 'TypeDoc API Documentation';
        settings.hideGenerator = true;
        settings.readme        = 'none';
        settings.gaID          = 'UA-53674298-1';
        settings.gaSite        = 'typedoc.io';
        settings.theme         = 'theme';
        settings.mode          = TypeDoc.SourceFileMode.File;

        var app = new TypeDoc.Application(settings);
        app.generate(settings.inputFiles, settings.out);
    });

    grunt.registerTask('build', 'Create api documentation', [
        'typedoc',
        'copy'
    ]);

    grunt.registerTask('publish', 'Publish to typedoc.io/api', [
        'build',
        'gh-pages'
    ]);

    grunt.registerTask('default', ['build']);
};