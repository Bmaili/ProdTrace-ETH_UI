import request from '@/utils/request'

// 查询流程列表
export function listFlow(query) {
    return request({
        url: '/flow/list',
        method: 'get',
        params: query
    })
}

// 查询详细溯源流程
export function getFlowTrace(traceId) {
    return request({
        url: '/getTrace',
        method: 'get',
        params: {traceId}
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
export function upFlowFile(data) {
    return request({
        url: '/upFile',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
