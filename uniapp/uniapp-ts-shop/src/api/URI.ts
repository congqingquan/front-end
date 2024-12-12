export const toApiURL = (uri: string) => {
    return  import.meta.env.VITE_API_DOMAIN + uri
}

export default {
    // 会员
    MEMBER_REGISTER_OR_LOGIN: toApiURL('/api/c/member/registerOrLogin'),

    // 轮播图
    CAROUSELS_PAGE: toApiURL('/api/c/carousels/page')
}