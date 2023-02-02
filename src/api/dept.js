import request from '@/utils/request'

//上传部门图片资料
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

// 查询部门列表
export function listDept(query) {
    return request({
        url: '/dept/list',
        method: 'get',
        params: query
    })
}

// 查询部门详细
export function getDept(deptId) {
    return request({
        url: '/dept',
        method: 'get',
        params:{deptId}
    })
}

// 查询部门下拉树结构
export function treeselect() {
    return request({
        url: '/dept/treeselect',
        method: 'get'
    })
}

export function listselect() {
    return request({
        url: '/dept/listselect',
        method: 'get'
    })
}

// 根据角色ID查询部门树结构
// export function roleDeptTreeselect(roleId) {
//     return request({
//         url: '/system/dept/roleDeptTreeselect/' + roleId,
//         method: 'get'
//     })
// }

// 新增部门
export function addDept(data) {
    return request({
        url: '/dept',
        method: 'post',
        data: data
    })
}

// 修改部门
export function updateDept(data) {
    return request({
        url: '/dept',
        method: 'put',
        data: data
    })
}

// 删除部门
export function delDept(deptId) {
    return request({
        url: '/dept',
        method: 'delete',
        params:{deptId}
    })
}
