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
    
    var dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
            //???这里是什么意思，其实我是不明白的
            Dep.target && dep.addSub(Dep.target)

            console.log('---获取该值啦')
            return value
        },
        set(newVal) {
            console.log('----设置该值啦', newVal)
            // obj[key] = newVal 这样子设置值会出现爆栈的情况，不知为何
            value = newVal //注意这里是这样子设置值的
            dep.notify()
        }
    })
}

// 订阅器(图书管理员)，data（书籍）和watcher(订阅书籍的借阅者)的桥梁
function Dep() {
    this.subs = [] //管理订阅者
}

Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub)
    },
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}