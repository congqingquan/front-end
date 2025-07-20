<template>
    <a-input-ext
        class="input-text"
        ref="inputExtRef"
        :extensionName="'InputExt'"
        @input="(e) => console.log(e.target.value)"
        placeholder="请输入"
    >
        <template #prefix>
            <FolderOpenTwoTone />
        </template>
    </a-input-ext>
</template>

<script setup lang="ts">
import {FolderOpenTwoTone} from '@ant-design/icons-vue';
import AInputExt from "@/04-component/06-secondary-encapsulation-component/AInputExt.vue";
import {onMounted, ref} from "vue";

const inputExtRef = ref<InstanceType<typeof AInputExt>>();
onMounted(() => {
    const originalAInput = inputExtRef.value?.getOriginalAInput()
    console.log("原生 AInput", originalAInput)
})
</script>

<style scoped lang="css">
.input-text {
    width: 100px;
    height: 100px;
}
</style>
