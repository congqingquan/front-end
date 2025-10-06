<template>
	<div class="a-image-ext-container">
		<div class="image-wrapper">
			<component
				ref="originalAImageRef"
				class="ant-image-img"
				:width="'100%'"
				:height="'100%'"
				:is="h(AImage, { ...props } as RowProps, $slots)"
				:previewMask="false"
				:preview="{
						visible: visibleRef,
						onVisibleChange,
					}"
				@click="(e: MouseEvent) => handleImageClick(e, nameRef, dataRef)"
			>
			</component>
			<div v-if="selectableRef && selectedRef" class="image-mask" @click="(e) => handleImageMaskClick(e, nameRef, dataRef)">
				<span class="image-mask-title">
					<CheckOutlined/>
				</span>
			</div>
		</div>
		<div v-if="operableRef" class="image-operation">
			<!-- 重命名 -->
			<a-popconfirm
				v-if="renamableRef"
				:icon="null"
				ok-text="确定"
				cancel-text="取消"
				@confirm="handleRenameConfirm"
			>
				<template #description>
					<a-input v-model:value="renameRef"/>
				</template>
				<button @click="handleRenameClick">重命名</button>
			</a-popconfirm>
			<!-- 预览 -->
			<button v-if="previewableRef" @click="onVisibleChange(true)">预览</button>
		</div>
		<div v-if="closableRef" class="image-operation-close" @click="(e) => handleCloseClick(e, nameRef, dataRef)">
			<CloseOutlined/>
		</div>
		<div v-if="nameRef" class="image-title" :title="nameRef">
			{{ nameRef }}
		</div>
	</div>
</template>

<script setup lang="ts">
import {h} from 'vue'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons-vue';
import {Image as AImage, ImageProps as AImageProps, RowProps} from 'ant-design-vue'
import {AnyIndexSignature} from "@/types";

// =============================================================== Component ===============================================================
// 1. 组件属性
// Failed to resolve extends base type.
// If this previously worked in 3.2, you can instruct the compiler to ignore this extend by adding /* @vue-ignore */ before it, for example:
// interface Props extends /* @vue-ignore */ Base {}
// Note: both in 3.2 or with the ignore, the properties in the base type are treated as fallthrough attrs at runtime.
// export type AImageExtProps = Partial<Omit<AImageProps, "width" | "height" | "previewMask"> & {
// 	name: string
// }>
export type Data = AnyIndexSignature | undefined
export type AImageExtProps = {
	alt?: string | undefined,
	fallback?: string | undefined,
	src?: string | undefined,

	name?: string | undefined,
	data?: Data | undefined,

	selectable?: boolean | undefined,
	closable?: boolean | undefined,
	renamable?: boolean | undefined,
	previewable?: boolean | undefined,
}
const props = defineProps<AImageExtProps>()
const dataRef = computed(() => props.data ?? {})
const nameRef = computed(() => props.name ?? '')

const selectableRef = computed(() => props.selectable ?? false)
const closableRef = computed(() => props.closable ?? false)
const renamableRef = computed(() => props.renamable ?? false)
const previewableRef = computed(() => props.previewable ?? false)

const operableRef = computed(() => selectableRef.value || renamableRef.value || previewableRef.value)
const cursorRef = computed(() => operableRef.value || closableRef.value ? 'pointer' : 'unset')

// 2. 组件 ref 方法
const originalAImageRef = ref<AImageProps>()
export type AImageExtExpose = {
	getOriginalAImage: () => AImageProps
}
defineExpose<AImageExtExpose>({
	getOriginalAImage: () => originalAImageRef.value!
})

// 3. 组件 bind 方法
const emit = defineEmits<{
	'onBeforeSelected': [name: string, data: Data, canSelectedCallback: (result: boolean) => void],
	'onSelected': [name: string, data: Data],
	'onDeselected': [name: string, data: Data],
	'onClosed': [name: string, data: Data],
	'onRename': [oldName: string, data: Data, newName: string],
}>();

// =============================================================== Select ===============================================================
// 1. Select image
const selectedRef = ref(false)
const handleImageClick = (_e: MouseEvent, name: string, data: Data) => {
	// 增加遮罩
	if (!selectableRef.value) {
		return
	}

	let canSelected = true
	emit('onBeforeSelected', name, data, (result: boolean) => {
		canSelected =  result
	})
	if (!canSelected) {
		return
	}

	selectedRef.value = true
	emit('onSelected', name, data)
	// 无效，推断是 AImage 的父元素触发的预览弹框（AImage 组件生成 DOM 时，会被包裹一层父元素）
	// _e.preventDefault()
	// _e.stopPropagation()
}
// 2. Select image mask
const handleImageMaskClick = (_e: MouseEvent, name: string, data: Data) => {
	// 增加遮罩
	if (!selectableRef.value) {
		return
	}
	selectedRef.value = false
	emit('onDeselected', name, data)
}

// =============================================================== Close ===============================================================
const handleCloseClick = (e: MouseEvent, name: string, data: Data) => {
	e.stopPropagation()
	if (!closableRef.value) {
		return
	}
	emit('onClosed', name, data)
}

// =============================================================== Preview ===============================================================
const visibleRef = ref<boolean>(false);
const onVisibleChange = (value: boolean, prevValue?: boolean) => {
	if (!previewableRef.value) {
		return
	}
	if (value) {
		// 若直接点击图像是，prevValue 会为 false
		// 当通过 查看 按钮触发点击时，prevValue 会为 undefined，因为没有传递。
		// 故可以依次来判断，触发源是否为查看按钮。
		if (prevValue === undefined) {
			visibleRef.value = true;
		}
	} else {
		visibleRef.value = value;
	}
}

// =============================================================== Rename ===============================================================
const renameRef = ref<string>(nameRef.value)
const handleRenameClick = () => {
	if (!renamableRef.value) {
		return
	}
	renameRef.value = nameRef.value
}
const handleRenameConfirm = () => {
	if (!renamableRef.value) {
		return
	}
	emit('onRename', nameRef.value, dataRef.value, renameRef.value)
}

</script>

<style scoped lang="scss">

.a-image-ext-container {
	// inline-flex: 既可以受到 text-align 的影响，也为一个 Flex 自适应元素
	// 1. text-align: 在 ATable 中可以居中
	// 2. flex: 子元素 AImage { width: 100%; height: 100%; } 可以自适应填充满父元素

	display: inline-block;
	//flex-direction: column;

	width: 128px;
	height: 128px;
	position: relative;
	margin: 0 10px;

	cursor: v-bind(cursorRef);
}

.image-wrapper {
	width: 100%;
	height: 85%;
	position: relative;

	.image-mask {
		width: 100%;
		height: 100%;

		color: #FFFFFF;
		background: rgba(0, 0, 0, 0.3);

		position: absolute;
		top: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.image-title {
	width: 100%;
	height: 15%;

	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	position: relative;
	bottom: 0;
}

.image-operation {
	display: flex;
	width: 100%;
	height: 25%;
	color: #FFFFFF;
	background: rgba(0, 0, 0, 0.5);

	border-top-left-radius: 5px;
	border-top-right-radius: 5px;

	justify-content: center;
	align-items: center;

	> button {
		padding: 0;
		margin: 0 5px;
		color: #FFFFFF;
		background-color: transparent;
		cursor: pointer;
	}

	position: absolute;
	bottom: 15%;

	opacity: 0;
	z-index: -1;
	transition: all 0.3s ease;
}

.image-operation-close {
	width: 15%;
	height: 15%;
	border-radius: 50%;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
	color: #FFFFFF;
	background: rgba(0, 0, 0, 0.5);

	position: absolute;
	top: 0;
	right: 0;
	transform: translate(50%, -50%);

	opacity: 0;
	z-index: -1;
	transition: all 0.3s ease;
}

.a-image-ext-container:hover .image-operation {
	opacity: 1;
	z-index: 1;
}

.a-image-ext-container:hover .image-operation-close {
	opacity: 1;
	z-index: 1;
}
</style>
