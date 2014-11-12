module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    browserify: {
      options: {
        transform: ['hbsfy'],
        watch: true,
        browerifyOptions: {
          debug: true,
        }
      },
      main: {
        dest: 'public/js/main.js',
        src: 'src/main.js',
      },
    },
    less: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          'public/css/styles.css': 'src/less/styles.less'
        }
      },
    },
    watch: {
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['less:dev']
      }
    }

  });

  grunt.registerTask('default', ['browserify', 'less:dev']);
  grunt.registerTask('dev', ['default', 'watch']);

};
