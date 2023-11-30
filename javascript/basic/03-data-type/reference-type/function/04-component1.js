// ============================= 不限定作用域 =============================
function func1() {
    console.log("component1 - func1")
}

function func2() {
    console.log("component1 - func2")
}

// ============================= 匿名自调用函数解决作用域问题 =============================
(function (window) {
    function func1() {
        console.log("component1 - func1")
    }

    function func2() {
        console.log("component1 - func2")
    }

    window.component1 = {
        func1, func2
    }
})(window)