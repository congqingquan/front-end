export const viewPages = import.meta.glob('@/views/**/index.vue')

export const matchViewComponent = (page: string) => {
    for (let pageName in viewPages) {
        if (pageName.endsWith(`${page}/index.vue`)) {
            return viewPages[pageName]
        }
    }
}