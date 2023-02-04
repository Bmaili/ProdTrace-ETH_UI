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
export function addCreaterFlow(data) {
    return request({
        url: '/createrFlow',
        method: 'post',
        data: data
    })
}
