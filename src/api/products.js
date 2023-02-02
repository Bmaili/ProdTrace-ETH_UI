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

// 新增产品
export function addProd(data) {
    return request({
        url: '/prod',
        method: 'post',
        data: data
    })
}

// 修改产品
export function updateProd(data) {
    return request({
        url: '/prod',
        method: 'put',
        data: data
    })
}

// 查询产品详细
export function getProd(prodId) {
    return request({
        url: '/prod',
        method: 'get',
        params: {prodId}
    })
}
