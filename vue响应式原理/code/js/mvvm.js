function MVVM(options) {
    this.$options = options
    
    new Compile(options.el)
}