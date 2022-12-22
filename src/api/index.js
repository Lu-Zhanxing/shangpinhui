import requests from './request'
import mockRequests from './mockAjax'

export const reqCategoryList = (() => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
})

export const reqBannerList = () => mockRequests.get('/banners')

export const reqFloorList = () => mockRequests.get('/floors')

// search请求列表
export const reqSearchList = ((params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
})