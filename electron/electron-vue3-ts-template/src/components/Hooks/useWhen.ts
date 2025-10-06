import {watch} from "vue";

export type UseWhenFunction = <T>(getter: () => T, callback: () => void | Promise<void>, predicate?: (value: T) => boolean) => void

const useWhen: UseWhenFunction = (getter, callback, predicate) => {
	watch(getter, value => {
		if (!predicate) {
			callback()
			return
		}
		if (predicate(value)) {
			callback()
			return;
		}
	})
}

export default useWhen
