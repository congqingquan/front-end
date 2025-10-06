import {watch} from "vue";

export type UseWhenTrueFunction = <CallbackReturn = unknown>(getter: () => boolean, callback: () => CallbackReturn) => void

const useWhenTrue: UseWhenTrueFunction = (getter, callback) => {
	watch(getter, value => value && callback())
}

export default useWhenTrue
