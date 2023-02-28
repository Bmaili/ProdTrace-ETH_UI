import request from '@/utils/request'

// 查询用户反馈列表
export function listFeedback(query) {
    return request({
        url: '/feedback/list',
        method: 'get',
        params: query
    })
}

// 新增用户反馈
export function addFeedback(data) {
    return request({
        url: '/feedback',
        method: 'post',
        data: data
    })
}

// 删除用户反馈
export function delFeedback(feedbackId) {
    return request({
        url: '/feedback',
        method: 'delete',
        params:{feedbackId}
    })
}

// 查询用户反馈详细
export function getFeedback(feedbackId) {
    return request({
        url: '/feedback',
        method: 'get',
        params: {feedbackId}
    })
}
