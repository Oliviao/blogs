代码

```js
Function.prototype.bind=function(){
    var that=arguments[0]
    var arg=Array.from(arguments).slice(1)
    var method=this
    return function(){
        return method.apply(that,arg.concat(Array.from(arguments)))
    }
}

var say=function (sex){
    console.log('+++',this,arguments)
}.bind({name:'lily'},'lalal')

say('mail','femail')
```