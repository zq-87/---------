## grunt

> 本笔记视频来源----b站尚硅谷的grunt教程
>
> 官网：https://www.gruntjs.net/getting-startedgrunt

### grunt介绍

他是一套前端**自动化构建**工具，一个基于nodejs的命令行的工具。

他是一个**任务运行器**，配合其丰富的**插件**

常用功能：

* 合并文件（js/css）
* 压缩文件（js/css）
* 语法检查（js）
* less/sass预编译处理
* 其他。。。

#### 安装nodejs

网上有很多nodejs的安装教程，这里不做介绍

```js
// 查看node版本 
node -v
```

#### 创建一个简单的应用grunt_test

手动创建的应用（目录结构的说明）

```js
|-build(dist)------------------构建生成的文件所在的文件夹（存放构建后的文件夹）
|-src--------------------源码文件夹
	|-js-----------------js源文件夹
	|-css----------------css源文件夹
|-index.html-------------页面文件
|-Gruntfile.js-----------grunt配置文件（首字母大写）
|-package.json-----------项目包配置文件
{
    "name":"grunt_test",
     "version":"1.0.0"
}
```

#### 全局安装grunt-cli

这个grunt-cli有什么作用？不安装可以直接使用grunt吗？

Grunt CLI的任务很简单：调用与`Gruntfile`在同一目录中 Grunt。这样带来的好处是，允许你在同一个系统上同时安装多个版本的 Grunt。这样就能让多个版本的 Grunt 同时安装在同一台机器上。------来自官网

不安装cli，直接使用grunt命令会报：”'grunt' 不是内部或外部命令，也不是可运行的程序。或批处理文件。“

```js
npm install -g grunt-cli
```

#### 在项目中局部安装grunt

```js
npm install grunt --save-dev
npm install grunt@1.0.1 --save-dev（视频中老师使用的版本）

// 运行构建项目命令
grunt
```

#### 配置文件：Gruntfile.js

此配置文件本质就是一个node函数类型的模块

配置编码包含3步：

* 初始化文件配置
* 加载插件任务
* 注册构建任务

usage：

```js
module.exports = function(grunt) {

  // 初始化配置grunt任务
  grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
  });

  // grunt任务执行的时候去加载对应的任务插件，这里加载的是 "uglify" 任务的插件。
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。注册grunt的默认任务
  grunt.registerTask('default', []);

};
```

### grunt的插件

插件分类：

* grunt团队贡献的插件：插件名大都以contrib-开头
* 第三方提供的插件：大都不以contrib-开头

常用的插件：（下面标记的是视频里面讲解的）

* grunt-contrib-clean---------------清除文件（打包处理生成的）
* ==grunt-contrib-concat==-------------合并多个文件的代码到一个文件中
* ==grunt-contrib-uglify==---------------压缩js文件
* ==grunt-contrib-jshint==---------------javascript语法错误检查
* ==grunt-contrib-cssmin==-------------压缩/合并css文件
* grunt-contrib-htmlmin-----------压缩html文件
* grunt-contrib-imagemin---------压缩图片文件（无损）
* grunt-contrib-copy-----------------复制文件，文件夹
* ==grunt-contrib-watch==----------------实时监控文件变化，调用相应的任务重新执行

### grunt常用插件的基本使用

#### 合并js：concat

##### 1.在项目中安装grunt-contrib-concat插件

```js
npm install grunt-contrib-concat --save-dev
```

项目中创建2个测试js

```js
// src/js/test1.js
(function(){
  function foo(num1,num2){
    return num1 + num2;
  }
  console.log(foo(1,2))

})();
// src/js/test2.js
(function(){
  var res = [1,2,3,4].map(function(item,index){
    return item + 10;
  })
  console.log(res)
})();
```



##### 2.在Gruntfile.js编写对应的代码

> https://www.npmjs.com/package/grunt-contrib-concat

```js
module.exports = function(grunt) {

 grunt.initConfig({
    // myconcat: { // 任务名：concat的，这个名可以自定义吗？不可以，执行grunt命令报错！Warning: Task "myconcat" not 	//found. Use --force to continue.
      concat: { // 任务名：concat
      options: {
        separator: ';', // 合并的文件用;隔开
      },
      dist: {
        src: ['src/js/test1.js', 'src/js/test2.js'], // 要合并的文件集合
        dest: 'dist/js/built.js',
      },
    },
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat']);

};
```

##### 3.成功执行grunt命令后

```js
// build/js/build.js
(function(){
  function foo(num1,num2){
    return num1 + num2;
  }
  console.log(foo(1,2))

})();;(function(){
  var res = [1,2,3,4].map(function(item,index){
    return item + 10;
  })
  console.log(res)
})();
```

test1.js里面没有使用foo函数时

```js
(function(){
  function foo(num1,num2){
    return num1 + num2;
  }
  //console.log(foo(1,2))

})();;(function(){
  var res = [1,2,3,4].map(function(item,index){
    return item + 10;
  })
  console.log(res)
})();
```

#### 压缩js: uglify

> https://www.npmjs.com/package/grunt-contrib-uglify

##### 1.安装grunt-contrib-uglify

```js
npm install grunt-contrib-uglify --save-dev
```

##### 2.在Gruntfile.js编写对应的代码

```js
module.exports = function(grunt) {
  grunt.initConfig({
      // 这里省略了concat任务。。。上面有相关代码
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
      }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify']);

};
```

##### 3.成功执行grunt命令后

**注意：**

1.对于只声明没有使用的变量和函数，在压缩时uglify插件会自动去除对应的代码

2.在执行任务时，如果先执行了uglify，再执行concat。`grunt.registerTask('default', ['uglify','concat']);`不会生成build.min.js(==这是由于grunt是同步执行任务的==)

```js
test1.js：没有使用foo函数，只是声明了该函数
(function(){
  function foo(num1,num2){
    return num1 + num2;
  }
  //console.log(foo(1,2))

})();
// build/js/build.min.js
/*! grunt_test - v1.0.0 - 2022-07-26 */
!function(){var n=[1,2,3,4].map(function(n,o){return n+10});console.log(n)}();
```

#### js语法检查: jshint

> https://www.npmjs.com/package/grunt-contrib-jshint

##### 1.安装grunt-contrib-jshint

```js
npm install grunt-contrib-jshint --save-dev
```

##### 2.创建.jshintrc文件（根目录下）

```js
.jshintrc是一个json文件
{
      "curly": true,
      "eqeqeq": true,
      "eqnull": true,
      "expr" : true,
      "immed": true,
      "newcap": true,
      "noempty": true,
      "noarg": true,
      "regexp": true,
      "browser": true,
      "devel": true,
      "node": true,
      "boss": false,
      
      //不能使用未定义的变量
      "undef": true,
      //语句后面必须有分号
      "asi": false,
      //预定义不检查的全局变量
      "predef": [ "define", "BMap", "angular", "BMAP_STATUS_SUCCESS"]
    }
```



##### 2.在Gruntfile.js编写对应的代码

```js
module.exports = function (grunt) {
  grunt.initConfig({
   // 省略了concat和uglify任务的配置
    jshint: {
      options:{
        jshintrc: '.jshintrc' // 指定配置文件
      },
      build: ['Gruntfile.js','src/js/*.js'] // 指定检查的js
    }
    
  });

  // 加载相关任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat'); // js合并插件
  grunt.loadNpmTasks('grunt-contrib-uglify'); // js压缩插件
  grunt.loadNpmTasks('grunt-contrib-jshint'); // js语法检查插件
  
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat','uglify','jshint']);

};
```

##### 3.成功执行grunt命令后

```js
//test2.js
(function(){
  var res = [1,2,3,4].map(function(item,index){
    return item + 10
  })
  console.log(res)
})();


src/js/test2.js
      3 |    return item + 10
                             ^ Missing semicolon.
      4 |  })
             ^ Missing semicolon.
      5 |  console.log(res)
                           ^ Missing semicolon.
```

#### 合并/压缩css文件: cssmin

> https://www.npmjs.com/package/grunt-contrib-cssmin

##### 1.安装grunt-contrib-cssmin

```js
npm install grunt-contrib-cssmin --save-dev
```

##### 2.在Gruntfile.js编写对应的代码

准备2个测试的css文件

```css
// test1.css
#box1{
  width: 100px;
  height: 100px;
  background: pink;
}

// test2.css
#box2{
   margin-right:100px;
  width: 100px;
  height: 100px;
  background: skybule;
}
```

在index.html引入

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>grunt学习</title>
  <link rel="stylesheet" href="build/css/build.min.css">
</head>
<body>
  <div id="box1"></div>
  <div id="box2"></div>
</body>
</html>
```

##### 3.成功执行grunt命令后

```js
// build/css/build.min.css
#box1{width:100px;height:100px;background:pink}#box2{margin-right:100px;width:100px;height:100px;background:skybule}
```

#### 监听文件改变: watch（实现任务自动化，提高开发效率）

> https://www.npmjs.com/package/grunt-contrib-watch

##### 1.安装grunt-contrib-watch

```js
npm install grunt-contrib-watch --save-dev
```

##### 2.在Gruntfile.js编写对应的代码

```js
module.exports = function (grunt) {
  grunt.initConfig({
    // 省略了concat,uglify,jshint,cssmin任务的配置
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
    

  // 改进后：开发时，使用grunt myWatch进行命令执行;真正要上线使用grunt命令直接打包
  grunt.registerTask('default', ['concat','uglify','jshint','cssmin']);// 上线
  grunt.registerTask('myWatch', ['default', 'watch']) // 开发
};
```



##### 3.成功执行grunt命令后

> ctrl+c停止终端命令

命令行窗口处于waiting状态，在这个时候如果修改了js文件或者css文件，都会执行上面的默认任务

