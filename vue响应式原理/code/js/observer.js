var data = {
    name: 'lily',
    score: {
       math: 90,
       english: 90 
    },
    hobby: ['pingpong', 'swing', 'jump']
}

// observe函数，添加get和set
function observe(obj) {
    if(!obj || typeof obj !== 'object') {
        // 我感觉这里有bug，其实这样子没有什么问题的
        return
    }

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

function defineReactive(obj, key, value){
    // 递归子属性
    observe(value)

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
            console.log('---获取该值啦')
            return value
        },
        set(newVal) {
            console.log('----设置该值啦', newVal)
            // obj[key] = newVal 这样子设置值会出现爆栈的情况，不知为何
            value = newVal //注意这里是这样子设置值的
        }
    })
}