<template>
	<div>
		<div>
			<h3>写文件</h3>
			<a-space>
				<!-- /Users/congqingquan/Desktop/WriteFile.txt -->
				<a-input v-model:value="writeFilePathRef"></a-input>
				<a-textarea v-model:value="writeFileContentRef"></a-textarea>
				<a-button type="primary" @click="handleWriteFile">写文件</a-button>
			</a-space>
		</div>
		<div>
			<h3>读文件</h3>
			<a-space>
				<!-- /Users/congqingquan/Desktop/ReadFile.txt -->
				<a-input v-model:value="readFilePathRef"></a-input>
				<a-button type="primary" @click="handleReadFile">读文件</a-button>
				<a-textarea v-model:value="readFileContentRef"></a-textarea>
			</a-space>
		</div>
	</div>
</template>

<script setup lang="ts">
import {message} from "ant-design-vue";

// ============================== Send message to main ==============================
// write
const writeFilePathRef = ref('/Users/congqingquan/Desktop/WriteFile.txt')
const writeFileContentRef = ref('')
const handleWriteFile = async () => {
	try {
		window.FilePreload.writeFile(writeFilePathRef.value, writeFileContentRef.value)
		message.success('写成功')
	} catch (error) {
		message.error('写失败')
	}
}

// read
const readFilePathRef = ref('/Users/congqingquan/Desktop/WriteFile.txt')
const readFileContentRef = ref('')
const handleReadFile = async () => {
	try {
		readFileContentRef.value = await window.FilePreload.readFile(readFilePathRef.value)
		message.success('读成功')
	} catch (error) {
		message.error('读失败')
	}
}

// ============================== Receive message from main ==============================
window.ipcRenderer.on('main-process-message', (_event, message) => {
	console.log(`================== Received message from main process: [${message}] ==================`)
})
</script>

<style scoped lang="scss">
</style>
