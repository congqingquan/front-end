// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$t: ReturnType<typeof import('vue-i18n')['useI18n']>['t'];
	}
}
