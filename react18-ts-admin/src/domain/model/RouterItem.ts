export default interface RouterItem {
    id?: string
    path: string
    element?: React.ReactNode,
    Component?: React.ComponentType | null,
    children?: RouterItem[]
}