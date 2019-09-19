---------------------------------第二次-------------------------
```js
var url = 'https://www.baidu.com:8000/dir/index.html?name=lily#fragment'
console.log(url)
var reg = /^([a-zA-Z]+:)?(?:\/{2})?([a-zA-Z\-0-9\.]+)(?::(\d+))?(\/[^?#]+)(\?[^#]+)?(#.*)?/g
// console.log(reg.exec(url))

var result = reg.exec(url)
console.log(result)

var location = {}
location.href = result[0]
location.protocal = result[1]
location.host = result[2]
location.port = result[3]
location.pathname = result[4]
location.search = result[5]
location.hash = result[6]

console.log('结果是：', location)
```

---------------------------------第一次-------------------------

代码实现：

```js
var str='git://www.baidu.com:8080/dir/index.html?name=lily&sex=lady#fragment/y'

var reg=/^(?:([a-zA-Z]+):)?(?:[\/]{0,3})([a-zA-Z\d\-.]+)(?::(\d+))+(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/g

console.log(reg.exec(str))
```
结果如下：

<img src="images/reg1.jpeg" width="800px"/>

参考：《Javascript语言精粹》65页