em.....

看着小程序的gulpfile.js做了一遍，跟着w3c上的系列教程GULP系列教程做了做，顺便写写文档

 

1、使用 gulp 的原因

简单，api精简

2、小程序里的gulp任务都被放在了gulpfile.js里面，但是如果gulpfile.js里面的体积太大，该如何分解呢？

使用 require-dir，可以分离任务到多个文件中

使用 require-dir 的神奇之处在于，创建下面一个目录 gulp/tasks，该目录下面的 task 任务尽管会分散在该目录下不同的子目录中，但是直接引用即可，这些任务之间是能相互找到的

 

3、怎样清空dist目录

引入node模块 del

4、为什么要引入 gulp-plumber

保持gulp运行即便有语法错误

 

5、 js 打包规则

一般使用vender.js 来打包全部的运行工具库，例如jquery 或者 loadsh之类的基本每个页面都会用到

其他的单个文件引用的或者只有几个页面才引用的 js 代码，分别打包分别引用

一般来说，js引用最多的都是首页之类的多内容形式页，如果这里的引用实在太多，就从“优先加载首屏”使用到的js文件优先加载，或者从“优先加载首屏渲染效果”

使用到的 js 文件进行加载，不要简单粗暴的打包成一个

 

 6、在打包过程中可能使用到 child_progress 的情况

文件越大打包越慢，可以考虑用这个

child_progress出现的背景：node保持了单线程的特点，大大提升了性能，且成功避免了多线程编程带来的诸多问题。但是它却会导致cpu占用与I/O存在冲突，针对这个问题，

诞生了child_progress, 它可以生产子进程，这意味着node可以将计算分发到各个子进程，将大量的计算分解掉，然后通过进程之间的事件消息来传递结果。这是一种Master-Worker的

管理方式，类似于HTML5的Web Workers

 

7、有关Browserify

用法：通常和 gulp-sourcemaps 一起使用，顺道加上 gulp-uglify

作用：处理 javascript

如果你的js打包需求实在过于简单，那就用 gulp-concat 就阔以了

打包过程中，注意使用一些额外工具来处理错误，并日志输出压缩过程

 

8、使用 browserify-shim 有撒好处

是一个模块化依赖分析插件，比如，配置了 jquery 之后，打包的时候就不会把它打包进比如bundle.js里面

 

9、使用CommonJS 模块有撒好处

可以输出函数、对象、字符串、整数等任何想要作为模块进行独立输出的内容

CommonJS规范虽然在大部分是草案，但是为Javascript大型应用开发指了一条明路，其规范涵盖了模块、Buffer、包管理等很多方面。Node遵循其规范并深受影响

 

10、默认情况下，每次运行的时候所有的文件都会传递并通过整个管道。使用gulp_changed可以只让更改过的文件传递过管道。大大加快了连续多次运行的速度。

 

11、小图片处理方式

替换成Base64嵌入到CSS文件中，以减少额外请求，并且这种做法能够大大加快页面载入速度

 

12、gulp.watch

监听文件的改变，执行相应的任务

 

13、如何检查SCSS 和 JavaScript语法

我们应当检查还未进行编译的语法错误，编译之后检查语法错误没有意义

检查 SCSS 语法的插件：gulp-scss-lint

检查 JavaScript 语法的插件：gulp-jshint，jshint-stylish

另，可以在当前项目的根目录下给SCSS检查添加隐藏文件.scss-lint.yml和给JSHint添加.jshintrc来修改检查规则

踩坑gulp4
1、gulp4下面用法报错

// 下面会报错
gulp.task('default', function(){
    // 做一些事
})
// 下面写法不会报错
gulp.task('default', async() => {
    // 做一些事
})
// 定义下面函数在其他任务里直接引用，会报错
function lessToWxss () {
  console.log('----less------')
}
// 下面写法不会报错
function lessToWxss (done) {
  console.log('----less------')
  done()
}

纠错：如果使用默认的异步任务支持，请确保使用了正确的异步执行方式：callback、 promise、或者 stream

2、 gulp4中使用gulp.series总报错

纠错：该函数只可以接收函数或多个

3、gulp4中应用gulp3的依赖方式会报错

下面报错

gulp.task('default', ['watch'], async() => {
  console.log('hello gulp.js')
})
纠错：

在gulp4中，我们不再需要显示的指定依赖。而是采用 gulp.series、gulp.parallel来对多个任务或者函数进行组合，来完成依赖关系

