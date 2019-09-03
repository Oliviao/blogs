// 快速排序
define(function(arr, start, end){
    var changeState = []
    function Partition(array, start, end){
        if(start >= end) {
            return
        }

        var slow = start
        var index = end
        for(var fast = start; fast < end; fast++){
            if(array[fast] <= array[index]) {
                if(slow !== fast) {
                    var k =array[slow]
                    array[slow] = array[fast]
                    array[fast] = k

                    // 收集状态1
                    var x = {}
                    x.arr = array.slice()
                    x.a = slow
                    x.b = fast
                    changeState.push(x)
                }
                slow++
            } 
        }

        var k = array[slow]
        array[slow] = array[index]
        array[index] = k

        // 收集状态2
        var x = {}
        x.arr = array.slice()
        x.a = slow
        x.b = index
        changeState.push(x)

        index = slow
        return index
    }
    function quickSort(arr, start, end) {
        if(start >= end) {
            return
        }
        var index = Partition(arr, start, end)
        if(index > start) {
            quickSort(arr, start, index - 1)
        }
        if(index < end) {
            quickSort(arr, index + 1, end)
        }
    }

    return {
        // 收集快速排序的变化过程
        changeState,
        quickSort
    }
})