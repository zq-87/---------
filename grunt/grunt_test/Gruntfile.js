module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // myconcat: { // 任务名：concat的，这个名可以自定义吗？不可以，执行grunt命令报错！Warning: Task "myconcat" not found. Use --force to continue.
    concat: { // 任务名：concat
      options: {
        separator: ';', // 合并的文件用;隔开
      },
      dist: {
        src: ['src/js/test1.js', 'src/js/test2.js'], // 要合并的文件集合
        dest: 'build/js/build.js',
      },
    },

    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: { // 压缩后文件的注释提示信息：package.json里面的name+版本号+设备的当前日期
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: { // 任务名：my_target(可以自定义)
        files: {
          'build/js/build.min.js': ['build/js/build.js']
        }
      }
    },
    jshint: {
      options:{
        jshintrc: '.jshintrc' // 指定配置文件
      },
      build: ['Gruntfile.js','src/js/*.js'] // 指定检查的js
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false, // 快速合并false,保证正确度
        roundingPrecision: -1 // 精确度
      },
      target: {
        files: {
          'build/css/build.min.css': ['src/css/*.css']
        }
      }
    },
    watch : {
      scripts : {
        files : ['src/js/*.js', 'src/css/*.css'],
        tasks : ['concat', 'jshint', 'uglify', 'cssmin'],
        options : {spawn : false}  
      }
    }
    
  
    
  });

  // 加载相关任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat'); // js合并插件
  grunt.loadNpmTasks('grunt-contrib-uglify'); // js压缩插件
  grunt.loadNpmTasks('grunt-contrib-jshint'); // js语法检查插件
  grunt.loadNpmTasks('grunt-contrib-cssmin'); // css合并压缩插件
  grunt.loadNpmTasks('grunt-contrib-watch'); // 检测文件变化插件
  
  // 默认被执行的任务列表。
  // grunt.registerTask('default', ['concat','uglify','jshint','cssmin','watch']);
  
  // 一点点改进
  grunt.registerTask('default', ['concat','uglify','jshint','cssmin']);
  grunt.registerTask('myWatch', ['default','watch']);

};