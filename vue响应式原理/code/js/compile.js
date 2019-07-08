function Compile(el) {
    console.log('----el', el, this)
    this.$el = document.querySelector(el)
    
    // 创建文档碎片
    var fragment = document.createDocumentFragment()
    fragment.appendChild(this.$el)

    // 渲染文档碎片
    console.log(fragment, fragment.childNodes)
}