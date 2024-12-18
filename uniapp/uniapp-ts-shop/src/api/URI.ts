export const toApiURL = (uri: string) => {
    return  import.meta.env.VITE_API_DOMAIN + uri
}

// 会员
export const MEMBER_REGISTER_OR_LOGIN = toApiURL('/api/c/member/registerOrLogin')

// 轮播图
export const CAROUSELS_PAGE = toApiURL('/api/c/carousels/page')

// 分类
// 1) 分页
export const CATEGORIES_PAGE = toApiURL('/api/c/categories/page')
// 2) 树
export const CATEGORIES_TREE = toApiURL('/api/c/categories/tree')