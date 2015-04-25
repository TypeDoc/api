module.exports = function (grunt) {
    'use strict';

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
        'typedoc': {
            options: {
                out: 'dist',
                name: 'TypeDoc API Documentation',
                hideGenerator: true,
                entryPoint: 'td',
                readme: 'none',
                gaID: 'UA-53674298-1',
                gaSite: 'typedoc.io',
                theme: 'theme',
                mode: 'File'
            },
            src: getTypeDocPath()
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('typedoc');

    grunt.registerTask('build', 'Create api documentation', ['typedoc', 'copy']);
    grunt.registerTask('publish', 'Publish to typedoc.io/api', ['build', 'gh-pages']);
    grunt.registerTask('default', ['build']);
};