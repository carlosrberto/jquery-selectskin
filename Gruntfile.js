module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),

        options: {
            banner: '' +
            '/*!\n' +
            ' * jQuery SelectSkin\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            ' * <%= pkg.author.url %>\n' +
            ' * \n' +
            ' * Licensed under a <%= pkg.licenses[0].type %>\n' +
            ' * <%= pkg.licenses[0].url %>\n' +
            ' *\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' */\n',

            name: 'jquery.selectskin',
        },

        jquerymanifest: {
            options: {
                source: '<%= pkg %>',
                overrides: {
                    name: 'selectskin',
                    dependencies: '<%= bower.dependencies %>'
                }
            }
        },

        "json-replace": {
            options: {
                replace : {
                    version: '<%= pkg.version %>'
                }
            },

            bower: {
                files : [{
                    src  : 'bower.json',
                    dest : 'bower.json'
                }]
            }
        },

        clean: ["dist"],

        concat: {
            options: {
                banner: '<%= options.banner %>'
            },

            js: {
                src: ['src/<%= options.name %>.js'],
                dest: 'dist/<%= options.name %>.js'
            },

            css: {
                src: ['src/<%= options.name %>.css'],
                dest: 'dist/<%= options.name %>.css'
            }
        },

        uglify: {
            options: {
                banner: '<%= options.banner %>'
            },

            dist: {
                files: {
                  'dist/<%= options.name %>.min.js': ['src/<%= options.name %>.js']
                }
            }
        },

        cssmin: {
            options: {
                banner: '<%= options.banner %>'
            },



            dist: {
                files: {
                   'dist/<%= options.name %>.min.css': ['src/<%= options.name %>.css']
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js']
        },

        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['jshint']
            }
        },

        connect: {
            demo: {
                options: {
                    port: 8000
                }
            }
        },

        open: {
            demo: {
                path: 'http://localhost:8000/demo/',
                app: 'Google Chrome'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jquerymanifest');
    grunt.loadNpmTasks('grunt-json-replace');
    grunt.loadNpmTasks('grunt-open');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'jshint', 'jquerymanifest', 'json-replace', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('server', ['connect:demo', 'open:demo', 'watch']);
};
