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