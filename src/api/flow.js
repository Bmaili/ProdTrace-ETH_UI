import request from '@/utils/request'

// 查询流程列表
export function listFlow(query) {
    return request({
        url: '/flow/list',
        method: 'get',
        params: query
    })
}

// 查询流程详细
export function getFlow(flowId) {
    return request({
        url: '/flow',
        method: 'get',
        params: {flowId}
    })
}

// 新增生产者流程
export function addCreateFlow(data) {
    return request({
        url: '/createFlow',
        method: 'post',
        data: data
    })
}

export function addProcessFlow(data) {
    return request({
        url: '/processFlow',
        method: 'post',
        data: data
    })
}

export function addTransportFlow(data) {
    return request({
        url: '/transportFlow',
        method: 'post',
        data: data
    })
}

export function addSaleFlow(data) {
    return request({
        url: '/saleFlow',
        method: 'post',
        data: data
    })
}
