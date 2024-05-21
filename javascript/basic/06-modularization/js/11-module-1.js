class Time {
    now

    constructor(now) {
        this.now = now
    }
};

// 每次通过 import 时，会获取首次初始化的对象。而不是每次 import 都会创建一个新对象
export default new Time(Math.random());
