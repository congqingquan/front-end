import { PropValue } from "@/types"

export const ProviderKeys = {
} as const

export type ProviderKeyType = PropValue<typeof ProviderKeys>
