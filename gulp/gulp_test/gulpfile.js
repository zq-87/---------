var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var liveReLoad = require('gulp-livereload');
var connect = require('gulp-connect');
var open = require('open');


// 压缩合并js的任务
gulp.task('myjs', function() {
  // 将你的默认的任务代码放在这
  return gulp.src('src/js/**/*.js') // 操作的源文件gulp.src('src/js/*.js')只会加载js文件下所有的js文件，不会匹配其他文件下的js
        .pipe(concat('build.js')) //合并到临时文件     
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe(rename({suffix: '.min'})) //重命名  .pipe(rename('build.min.js'))
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'))
        .pipe(liveReLoad.listen()) // 实时刷新
        .pipe(connect.reload());
});

// 编译less文件为css的任务
gulp.task('myless',function(){
  return gulp.src('src/less/*.less') // 操作的less文件
        .pipe(less())
        // .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('src/css/'))
        .pipe(liveReLoad.listen()) // 实时刷新
        .pipe(connect.reload());
})
// 合并压缩css的任务
// gulp.task('mycss', function () {
//   return gulp.src('src/css/*.css') // 操作的css文件
//       .pipe(concat('built.css')) // 合并后的名称
//       .pipe(gulp.dest('dist/css')) // 合并后文件输出到dist/css
//       .pipe(rename({suffix: '.min'})) // 合并的文件的后缀名设置
//       .pipe(cleanCss({compatibility: 'ie8'})) // 兼容ie8
//       .pipe(gulp.dest('dist/css')); // 压缩后的文件输出到dist/css
// });
// 
gulp.task('mycss',['myless'], function () {
  return gulp.src('src/css/*.css') // 操作的css文件
      .pipe(concat('built.css')) // 合并后的名称
      .pipe(gulp.dest('dist/css')) // 合并后文件输出到dist/css
      .pipe(rename({suffix: '.min'})) // 合并的文件的后缀名设置
      .pipe(cleanCss({compatibility: 'ie8'})) // 兼容ie8
      .pipe(gulp.dest('dist/css')) // 压缩后的文件输出到dist/css
      .pipe(liveReLoad.listen()) // 实时刷新
      .pipe(connect.reload());
});

// 压缩HTML的任务
gulp.task('myhtml',function(){
  return gulp.src('index.html')
         .pipe(htmlMin({collapseWhitespace:true}))
         .pipe(gulp.dest('dist'))
         .pipe(liveReLoad.listen()) // 实时刷新
         .pipe(connect.reload());
});
// 开启监听任务(半自动，需要手动刷新浏览器界面)
gulp.task('mywatch',['default'],function(){
  // return // 这里没有加return变成了同步任务？？？
  liveReLoad.listen(); // 开启监听
  // 监视指定的文件, 并指定对应的处理任务
  gulp.watch('src/js/**/*js',['myjs']); 
  gulp.watch(['src/css/*.css','src/less/*.less'],['mycss']);
});

// 开启监听任务（全自动，自动打开网址，自动刷新页面：需要插件gulp-connect和open）
gulp.task('server',['default'],function(){
  connect.server({ // 这个插件内部有个微型服务器，这个函数用来配置服务的相关信息
    root: 'dist', // 加载文件的根目录
    livereload: true, // 是否实时刷新
    port: 5000 // 服务器开启的端口号

  });
  // 自动开启链接
  open('http://localhost:5000');
  // 这里不需要liveReLoad.listen();？？？
  // 监视指定的文件, 并指定对应的处理任务
  gulp.watch('src/js/**/*js',['myjs']); 
  gulp.watch(['src/css/*.css','src/less/*.less'],['mycss']);
})

gulp.task('default', ['myjs','mycss','myhtml']); // 构建任务