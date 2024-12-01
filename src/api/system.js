import request from '@/utils/request'
/**
 * 获取角色列表
 * @returns
 */
export const getRoleListAPI = () => {
  return request({
    url: '/park/sys/role',
    method: 'GET'
  })
}
/**
 * 功能权限列表
 * @returns
 */
export const getTreeListAPI = () => {
  return request({
    url: '/park/sys/permision/all/tree',
    method: 'GET'
  })
}
/**
 * 获取当前角色权限点列表
 * @returns
 */
export function getRoleDetailAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`
  })
}
/**
 * 获取角色成员列表
 * @returns
 */
export function getRoleUserAPI(roleId) {
  return request({
    url: `/park/sys/roleUser/${roleId}`
  })
}
/**
 * 创建角色
 * @returns
 */
export function createRoleUserAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'POST',
    data
  })
}
/**
 * 更改角色
 * @returns
 */
export function updateRoleAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'PUT',
    data
  })
}
/**
 * 删除角色
 * @returns
 */
export function delRoleUserAPI(id) {
  return request({
    url: `/park/sys/role/` + id,
    method: 'DELETE'
  })
}
