import AdminApi from "@/api/AdminApi"

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $adminApi: typeof AdminApi;
  }
}