module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-typedoc');
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
        typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    out: 'dist/',
                    name: 'TypeDoc',
                    target: 'es5'
                },
                src: getTypeDocPath()
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