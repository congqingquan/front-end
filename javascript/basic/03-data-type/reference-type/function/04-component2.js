// ============================= 不限定作用域 =============================
function func1() {
    console.log("component2 - func1")
}

function func2() {
    console.log("component2 - func2")
}

// ============================= 块作用域解决作用域问题 =============================
{
    function func1() {
        console.log("component2 - func1")
    }

    function func2() {
        console.log("component2 - func2")
    }

    window.component2 = {
        func1, func2
    }
}