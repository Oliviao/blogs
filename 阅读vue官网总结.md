> 学习 Vue 的方法：
- 第一步：官网仔细过一遍，官网上的例子敲一遍
- 第二步：仿照 iView 实现几个典型组件，参照掘金小册子

> 使用 watch 监听某个属性的时候，不要在 watch 内部更改这个属性，否则会执行 100 次

> Vue 实例创建之后， Vue 会将模版编译成[虚拟dom]渲染函数，渲染好了之后，进入到 beforeMounted 生命周期

> 模板表达式里面不能访问用户定义的全局变量，同理，子组件不能访问父组件里边的变量

> 计算 class

```html
class="active"
```
当 active 需要通过计算得到的时候（即：这是数据绑定的class），应该：
```html
v-bind:class="{ active:isActive }" // 这是一个对象
```

注意 :class 和 :style 的区别

> v-for 遍历 Object.keys 的结果

属性分为可枚举属性和不可枚举属性，可枚举属性通过以下访问到：
```js
Object.keys
for...in
JSON.stringify
```
不可枚举属性通过以下访问：
```js
Object.getOwnPropertyNames
```
> js中，以数字开头的属性名不能用“点号”引用，必须使用方括号

> vue中使用组件的时候要注意理解这一点

template应该使用反斜杠“\”, 或者使用 es6 里面定义的模版字符串

组件内部通过使用 props 接受传递下来的数据，并且在某些情况下并不需要属性名相同，这样有一个极大的好处是使子组件与父组件充分<b>解藕</b>，且较方便追踪数据来源，有利于组件在其他场合复用

> 事件修饰符 .passive

```js
element.addEventListener('touchstart', fn, passive)
```
作用：提升页面滑动流畅度

原理：默认不会调用 event.preventDefault() 事件，当 touch 事件触发的时候，屏幕立即滚动。然而，通常事件触发之后，先执行回调完成后，并且没有用 event.preventDefault()，页面才开始滚动，这样就出现了页面卡顿的情况

> Vue 组件的 data 必须是一个函数，原因是什么

如果是一个对象的话，会出现多个实例引用一个 data 对象的情况，其中一个修改会引发其他实例的修改。然而，当 data 是一个函数的时候，每个实例的 data 会拥有独立的作用域，其中一个改变的时候不会影响到其他

> v-model 在 input 元素上的使用原理进行分解
```html
<input v-model="searchText">
// 分解如下：
<input v-bind:value="searchText" v-on:input="searchText = $event.target.value">
```

> 4 个 HTML 标签： b, strong, em, i

b标签用于单纯的物理上加粗字体

strong不仅加粗了字体，还表示该元素内容强烈重要

em用于改变句子的意思，比如"我<em>喜欢</em>胡萝卜" 和"我喜欢<em>胡萝卜</em>"，分别强调喜欢和胡萝卜

i用于技术术语

<image src="images/html1.jpeg" width="400px" />

> $event

将 v-model 应用于自定义组件的结果如下：

也可以这样提问：自定义组件里边的v-model是怎样实现的？
```html
<div id="app">
    <!-- 以下2种写法都对！ -->
    <input-number v-model="value"></input-number>
    <input-number :value="value1" v-on:input="value1=$event"></input-number>
</div>
```

子组件里面：
```js
props: ['value']
...
// this.currentValue是子组件内部定义的变量，将值传递给父组件，父组件里改变value
this.$emit('input', this.currentValue); 
```

提出一个问题：在事件发生的时候，如果既需要传入 event, 又需要传递参数，该怎么做？

```html
<button v-on:click="click($event, 123)">click me</button>
```
如果不需要传参，又可以怎样访问 event 呢？

```html
<!-- 方法1: 下面这样肯定是没有问题的 -->
<button v-on:click="click($event)">click me</button>
<!-- 方法2: 记住不要带圆括号哦，那么在click方法里就可以直接使用 event 啦！ -->
<button v-on:click="click">click me</button>
```

> 将上述例子使用 .sync 进行改写

```html
<div id="app">
    <!-- <input-number v-model="value"></input-number> -->
    <input-number v-bind:value.sync="value"></input-number>
</div>
```

子组件里面的触发形式如下：
```js
// this.$emit('input', this.currentValue)
this.$emit('update:value', this.currentValue)
```

> <em>计算属性computed</em>和<em>侦听属性watch</em>的区别

计算属性通过监听依赖的变化返回一个动态值，重点在于返回了一个动态值，那么它有两个选项：get 和 set。而侦听属性则是侧重于监听到数据变化的时候，完成一系列逻辑任务，比如：执行异步操作或者开销比较大的操作，它有三个选项: handler、deep、immediate(会立即执行哒哒哒)

> <em>计算属性computed</em>和<em>方法methods</em>的区别

<image src="images/vue1.jpeg" width="600px" />

> 事件修饰符

来一波“记忆轨迹”，在已知的知识基础上增加联想记忆，更有助于理解。当然还是要多看官网，更正对这一部分知识的理解，多次更正，反复学习。

<image src="images/vue2.jpeg" width="600px" />


> props单向数据流允许父组件改变子组件的状态，那么，子组件想要改变父组件的状态该怎么办呢？

3种办法：this.$emit、v-model、.sync
