import Api from "@/api/Api"

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: typeof Api;
  }
}