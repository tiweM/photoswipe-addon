module.exports = function (grunt) {
    "use strict";
    var pkgconf = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: pkgconf,
        watch: {
            website: {
                files: [
                    'src/js/photoswipe-addon.js'
                ],
                tasks: ['app']
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'src/js/photoswipe-addon.js'
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        concat: {
            website_foot: {
                src: [
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/photoswipe/dist/photoswipe.js",
                    "bower_components/photoswipe/dist/photoswipe-ui-default.js",
                    "src/js/photoswipe-addon.js"
                ],
                dest: 'dist/js/photoswipe-addon.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/photoswipe-addon.js': ['<%= concat.website_foot.dest %>']
                }
            }
        },
        compass: {
            website: {
                options: {
                    bundleExec: true,
                    config : 'config.rb'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass']);
    grunt.registerTask('app', ['jshint', 'concat']);
};