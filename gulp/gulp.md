## gulp-v3学习

> 官网：https://v3.gulpjs.com.cn/docs/getting-started/（旧版）

### 简单理解

==gulp基于node环境==

学习的是尚硅谷的gulp教程，里面是3.9.1版本的

#### gulp介绍：

特点：任务化，基于流，支持同步和异步。较之于grunt，gulp更高效（异步多任务），更易于使用，插件高质量

gulp与grunt功能类似的前端项目构建工具，也是==基于node环境==的自动**任务运行器**，能够自动
化的完成JavaScript/coffee/sass/less/html/image/css等文件的合并，压缩，检查，监听文件变化，浏览器自动刷新，测试等任务。

#### 手动创建一个gulp的项目结构

```js
// gulp_test
|- dist
|- src
  |- js
  |- css
  |- less
|- index.html
|- gulpfile.js-----gulp配置文件
|- package.json
  {
    "name": "gulp_test",
    "version": "1.0.0"
  } 
```

#### gulp的安装：（旧版文档）

确保电脑上已经安装了node环境

> 如果你先前将 gulp 安装到全局环境中了，请执行 `npm rm --global gulp` 将 gulp 删除再继续以下操作。

```js
// 全局安装
npm install gulp -g
// 局部安装，作为项目的开发依赖
npm install --save-dev gulp
npm install --save-dev gulp@3.9.1 
// 查看gulp的版本
gulp --version
```

在安装时没有安装全局，只在项目安装了局部的gulp,在执行任务时会报错吗？会报错,所以一定要安装全局的gulp

> 'gulp' 不是内部或外部命令，也不是可运行的程序或批处理文件。

#### 运行gulp任务

1.编写gulpfile.js

```js
var gulp = require('gulp');
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

2.在终端执行`gulp`命令

#### 报错：ReferenceError: primordials is not defined

原因：gulp版本为3.9.1，node版本为v14.16.0，会出现安装gulp使用不了插件的问题，此问题为gulp版本和node版本不兼容。

解决方法：

- 将gulp版本升级到v4。（不推荐）
- 将node版本降级到v11。（使用nvm工具--window系统，n工具--mac系统）
- 将graceful-fs升级到在node v12+下工作的版本4.2.2(推荐)。

推荐解决办法：
在package.json同级目录下新建文件npm-shrinkwrap.json，输入以下内容：==后在终端执行`npm install`==

```
{
    "dependencies": {
        "graceful-fs": {
        	"version": "4.2.2"
        }
     }
}
```

再次执行gulp命令，就不会报错！！！

### gulp常用插件

* gulp-concat：合并文件（js/css）
* gulp-uglify：压缩js文件
* gulp-rename：文件重命名
* gulp-less：编译less
* gulp-clean-css：压缩css
* gulp-liverload：实时自动编译刷新

### gulp常用API

> https://v3.gulpjs.com.cn/docs/api/

* gulp.src(globs[, options])：
  * 指向指定路径的所有文件, 返回文件流对象
  * 用于读取文件
* gulp.dest(path[, options])

  * 指向指定的所有文件夹
  * 用于向文件夹中输出文件
* gulp.task(name[, deps], fn)

  * 定义一个任务
* gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
  * 监视文件，并且可以在文件发生改动时候做一些事情

#### 1.实现一个简单的js合并压缩

1.下载对应的插件：`npm install gulp-concat@2.6.1 gulp-uglify@3.0.0 gulp-rename@1.2.2 --save-dev`

2.在gulpfile.js编写对应的任务:

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// 压缩合并js的任务
gulp.task('myjs', function() {
  // 将你的默认的任务代码放在这
  return gulp.src('src/js/**/*.js') // 操作的源文件gulp.src('src/js/*.js')只会加载js文件下所有的js文件，不会匹配其他文件下的js
        .pipe(concat('build.js')) //合并到临时文件     
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe(rename({suffix: '.min'})) //重命名  .pipe(rename('build.min.js'))
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));

});

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

3.执行`gulp 任务名`

`gulp js`

4.注意：对于没有使用的函数或者变量，在压缩文件里面是没有那些代码的

#### 2.编译less文件为css文件

1.下载插件：`npm install gulp-less@3.3.2 --save-dev`

2.在gulpfile.js编码

```js
var gulp = require('gulp');
var less = require('gulp-less');
// 编译less文件为css的任务
gulp.task('myless',function(){
  return gulp.src('src/less/*.less') // 操作的less文件
        .pipe(less())
        // .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('src/css/'))
})
```

3.运行`gulp myless`

#### 3.合并压缩css文件

1.下载插件：`npm install gulp-clean-css@3.9.0 --save-dev`

2.在gulpfile.js编码

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');

// 合并压缩css的任务
gulp.task('mycss', function () {
  return gulp.src('src/css/*.css') // 操作的css文件
      .pipe(concat('built.css')) // 合并后的名称
      .pipe(gulp.dest('dist/css')) // 合并后文件输出到dist/css
      .pipe(rename({suffix: '.min'})) // 合并的文件的后缀名设置
      .pipe(cleanCss({compatibility: 'ie8'})) // 兼容ie8
      .pipe(gulp.dest('dist/css')); // 压缩后的文件输出到dist/css
});

```

3.运行`gulp mycss`

#### gulp异步执行任务，任务之间存在依赖关系如何解决

gulp如何支持同步？

在创建任务时，不书写return，此时创建的任务就是一个同步任务。

异步任务，如何解决依赖关系？

```js
// css的任务就依赖less的任务，下面的代码表示：mycss任务依赖于myless任务
// 当执行gulp命令时，myjs启动，myless启动，只有当myless任务结束之后，mycss任务才会启动
gulp.task('mycss',['myless'], function () {
  return gulp.src('src/css/*.css') // 操作的css文件
      .pipe(concat('built.css')) // 合并后的名称
      .pipe(gulp.dest('dist/css')) // 合并后文件输出到dist/css
      .pipe(rename({suffix: '.min'})) // 合并的文件的后缀名设置
      .pipe(cleanCss({compatibility: 'ie8'})) // 兼容ie8
      .pipe(gulp.dest('dist/css')); // 压缩后的文件输出到dist/css
});

gulp.task('default', ['myjs','mycss']);
```

#### 4.对HTML文件的处理

> minify html：缩少html

1.下载插件：`npm install gulp-htmlmin@3.0.0 --save-dev`

2.在gulpfile.js编码

```js
const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
 
gulp.task('myhtml', () => {
  return gulp.src('index.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});
```

3.运行`gulp`

注意此时压缩的index.html里面引入的css,js文件的路径应该是不对的，在压缩时要考虑用户真正使用时获取的文件路径，进行正确的设置。

#### 5.实时监听，自动编译

1.下载插件：`npm install gulp-livereload@3.8.1 --save-dev`

> 这个工具主要作用是：当我们修改了部分js,css,html后，可以不用我们手工执行gulp命令，直接就合并压缩好了，提高效率
>
> 可以通过这个插件，创建一个任务：这个任务可以监听源文件的改变，并且去执行对应的任务！！！

2.在gulpfile.js编码

```js
var livereload = require('gulp-livereload');
          

gulp.task('watch', ['default'], function () {    
  // 开启监视
  livereload.listen();
  // 监视指定的文件, 并指定对应的处理任务
  gulp.watch('src/js/*.js', ['myjs']);
  gulp.watch(['src/css/*.css','src/less/*.less'], ['mycss']);
});
```

3.运行`gulp`

#### 6.热加载插件：gulp-connect

使用插件gulp-livereload可以帮我们监听文件变化，自动执行任务。但是每次我们都需要手动刷新，来看看对应的效果。不是很方便

> Gulp plugin to run a webserver (with LiveReload)

和实时监听有什么不同？什么叫做热加载？为什么要有热加载，他的使用场景是？自动刷新网页提高工作效率

1.下载插件：`npm install --save-dev gulp-connect@5.0.0`

2.在gulpfile.js编码

```js
var gulp = require('gulp'),
  connect = require('gulp-connect');
 
// 注册监听任务（全自动）
gulp.task('connect', function() {
 	// 配置加载的选项
    connect.server({
        root : 'dist/',// 监视的源目标文件路径
        livereload : true,// 是否实时刷新
        port : 5000// 开启端口号
    });
});
 
gulp.task('default', ['connect']);
```

补充：自动打开浏览器，输入网址

下载open插件：`npm install open@0.0.5 --save-dev`

#### 7.补充插件：gulp-load-plugins

下载：`npm install gulp-load-plugins@1.5.0 --save-dev`

他将所有gulp提供的插件封装为一个对象，默认是插件的名字，遵循小驼峰命名法

gulpfile.js

```js
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
// var concat = require('gulp-concat'); concat
// var rename = require('gulp-rename'); $.rename
// var less = require('gulp-less'); $.less
// var cleanCss = require('gulp-clean-css'); $.cleanCss

// 压缩合并js的任务
gulp.task('myjs', function() {
  return gulp.src('src/js/**/*.js') // 操作文件
        .pipe($.concat('build.js')) //合并到临时文件     
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe($.rename({suffix: '.min'})) //重命名  .pipe(rename('build.min.js'))
        .pipe($.uglify())    //压缩
        .pipe(gulp.dest('dist/js'))
        .pipe($.liveReLoad.listen()) // 实时刷新
        .pipe($.connect.reload());
});
```



