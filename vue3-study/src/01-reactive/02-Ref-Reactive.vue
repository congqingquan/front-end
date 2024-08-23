<!-- 
    ref: 可以包装所有类型数据
    reactive: 只能包装对象类型数据
-->

<!-- 1. 应用 -->
<!--
<script setup lang="ts">
    import { reactive, ref } from 'vue';

    const count = ref<number>(0);
    const addCount = () => {
        count.value++;
    }

    const reactiveCount = reactive<{ count: number }>({
        count: 0
    });
    const addReactiveCount = () => {
        reactiveCount.count++;
    }
</script>

<template>
    <button @click="addCount()">
        Ref btn: {{ count }}
    </button>

    <button @click="addReactiveCount()">
        Reactive btn: {{ reactiveCount.count }}
    </button>
</template>
-->

<!-- 2. 原理 -->
<script setup lang="ts">

    // 1) ref
    class Ref<T> {
        private _value: T;

        public constructor(value: T) {
            this._value = value;
        }

        set value(newValue: T) {
            this._value = newValue;
            // render
            let refBtn = document.getElementById("refBtn");
            if (refBtn) {
                refBtn.innerHTML = 'Ref btn: ' + newValue;
            }
        }

        get value(): T {
            // do something
            return this._value;
        }
    }

    const count = new Ref<number>(0);
    const addCount = () => {
        count.value++;
    }

    // 2) reactive
    function reactive<T extends object>(obj: any): T {
        return new Proxy(obj, {
            set(target, property, newValue, receiver) {

                console.log(target);
                console.log(property);
                console.log(newValue);
                console.log(receiver);
                

                target[property] = newValue;
                // render
                let refBtn = document.getElementById("reactiveBtn");
                if (refBtn) {
                    refBtn.innerHTML = 'Reactive btn: ' + newValue;
                }
                return true;
            },
            get(target, property, receiver) {
                // do something
                return target[property];
            },
        });
    }

    const reactiveCount = reactive<{ count: number }>({
        count: 0
    });
    const addReactiveCount = () => {
        reactiveCount.count++;
    }
</script>

<template>
    <button @click="addCount()" id="refBtn">
        Ref btn: {{ count.value }}
    </button>

    <button @click="addReactiveCount()" id="reactiveBtn">
        Reactive btn: {{ reactiveCount.count }}
    </button>
</template>

<style scoped>
</style>