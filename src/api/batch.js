import request from '@/utils/request'

// 查询批次列表
export function listBatch(query) {
    return request({
        url: '/batch/list',
        method: 'get',
        params: query
    })
}

// 查询批次详细
export function getBatch(batchId) {
    return request({
        url: '/batch',
        method: 'get',
        params: {batchId}
    })
}

// // 新增批次
// export function addBatch(data) {
//     return request({
//         url: '/batch',
//         method: 'post',
//         data: data
//     })
// }
