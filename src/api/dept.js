import request from '@/utils/request'

//上传企业图片资料
export function upPic(data){
    return request({
        url: '/dept/upPic',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// 查询企业完整信息列表
export function listDept(query) {
    return request({
        url: '/dept/list',
        method: 'get',
        params: query
    })
}

// 查询企业详细
export function getDept(deptId) {
    return request({
        url: '/dept',
        method: 'get',
        params:{deptId}
    })
}

// 查询企业下拉树结构
export function treeselect() {
    return request({
        url: '/dept/treeselect',
        method: 'get'
    })
}

//查询企业选项列表
export function getOptionsList(query) {
    return request({
        url: '/dept/options',
        method: 'get',
        params: query
    })
}

// 新增企业
export function addDept(data) {
    return request({
        url: '/dept',
        method: 'post',
        data: data
    })
}

// 修改企业
export function updateDept(data) {
    return request({
        url: '/dept',
        method: 'put',
        data: data
    })
}

// 删除企业
export function delDept(deptId) {
    return request({
        url: '/dept',
        method: 'delete',
        params:{deptId}
    })
}
