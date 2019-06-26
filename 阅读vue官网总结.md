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
