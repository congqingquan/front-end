<template>
    <div class="container">
        Child

        <br>
        Props - {{ props }}
        <br>
        <!-- ======================== 注意：$attrs 中不会包含定义在 defineProps 中的字段 ======================== -->
        $attrs - {{ $attrs }}
        <br>
        useAttrs - {{ attrs }}
        <br>
        $slots - {{ $slots }}
        <template v-for="(_, slot) in $slots">
            <span style="margin-left: 5px">{{ slot }}</span>
        </template>
    </div>
</template>

<script setup lang="ts">
import {useAttrs} from "vue";

export type ChildProps = {
    name: string
}
const props = withDefaults(defineProps<ChildProps>(), {
    name: "Default name",
})

const attrs = useAttrs()

</script>

<style scoped>
.container {
    border: 1px solid black;
}
</style>
