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
