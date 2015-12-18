module.exports = (grunt)->
    (require 'time-grunt') grunt
    (require 'load-grunt-tasks') grunt

    now = new Date()
    startYear = 2014
    endYear = ''
    endYear = '-' + now.getFullYear() if startYear < now.getFullYear()

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        timestamp: (require 'dateFormat')(now, 'yyyy-mm-dd HH:MM:ss Z')
        endYear: endYear
        jshint:
            options:
                jshintrc: '.jshintrc'
            all: ['src/index.js']
        babel:
            options:
                comments: false
                presets: ['babel-preset-es2015']
            es2015:
                src: 'src/index.js'
                dest: 'viewport.js'
        uglify:
            options:
                ASCIIOnly: true
                banner: '/*! viewport.min.js Released v<%=pkg.version%> Build <%=timestamp%> | (C) 2014<%=endYear%> yanni4night.com | github.com/yanni4night/flexible-viewport | MIT */\n'
            dist:
                src: 'viewport.js',
                dest: 'viewport.min.js'
    grunt.registerTask 'default', ['jshint', 'babel', 'uglify']