
```js
// 把一个html文本分解为标签和文本
var str = '<div class="root"> \
    <div class="container"> \
        <section class="sidebar"> \
            <ul class="menu"></ul> \
        </section> \
        <section class="main"> \
            <article class="post"></article> \
            <p class="copyright"></p> \
        </section> \
    </div> \
</div> \
'
console.log(str)
var reg=/<\/?([a-z]+)([^>]*)>/g
var item
while(item=reg.exec(str)){
    //console.log(item[0]+'-------'+item[2])
}

var result=str.match(reg)
console.log(result)
```
<img src="images/reg2.jpeg" width="800px"/>