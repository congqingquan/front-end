export interface SwiperInfo {
    linkUrl: string,
    imageUrl: string
}

export interface Categorynfo {
    key: string,
    name: string,
    icon: string,
    imageUrl: string,
    linkUrl: string,
    children: Categorynfo[]
}