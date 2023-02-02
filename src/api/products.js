import request from '@/utils/request'

// 查询产品列表
export function listProd(query) {
    return request({
        url: '/prod/list',
        method: 'get',
        params: query
    })
}

// 产品状态修改
export function changeProdStatus(prodId, status) {
    const data = {
        prodId,
        status
    }
    return request({
        url: '/prod/changeStatus',
        method: 'put',
        data: data
    })
}
