<template>
    <div>
        Child: {{props.msg}}
    </div>
</template>

<script lang="ts" setup>
    // defineProps 不需要导包，这个是 vue 的宏，vue 在编译时会自动进行代码替换

    // 1. 通过对象的方式定义
    const props = defineProps({
        msg: {
            type: String,
            // 如果父组件没有传递，控制台会抛出：Missing required prop: "msg"
            required: true,
            default: "Default msg"
        }
    })

    // 2. 通过数组的方式定义
    // const props = defineProps(["msg"])

    // 3. 通过泛型的方式定义    
    // interface SwiperInfo {
    //     linkUrl: string,
    //     imageUrl: string
    // }

    // const { infos } = defineProps<{
    //     infos: SwiperInfo[]
    // }>()
</script>

<style>
</style>