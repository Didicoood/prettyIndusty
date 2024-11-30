import request from '@/utils/request'
/**
 * 企业列表
 * @param {*} params
 * @returns
 */
export const getEnterpriseListAPI = (params) => {
  return request({
    url: '/park/enterprise',
    method: 'GET',
    params
  })
}
/**
 * 行业列表
 * @param {*} params
 * @returns
 */
export const getIndustryListAPI = () => {
  return request({
    url: '/park/industry',
    method: 'GET'
  })
}
/**
 * 文件上传
 * @param {*} params
 * @returns
 */
export const uploadAPI = (data) => {
  return request({
    url: '/upload',
    method: 'POST',
    data
  })
}
/**
 * 增加企业
 * @param {*} params
 * @returns
 */
export const createExterpriseAPI = (data) => {
  return request({
    url: '/park/enterprise',
    method: 'POST',
    data
  })
}

/**
 * 查看企业
 * @param {*} params
 * @returns
 */
export const getEnterpriseDetailAPI = (id) => {
  return request({
    url: '/park/enterprise/' + id
  })
}
/**
 * 编辑企业
 * @param {*} params
 * @returns
 */
export const updateExterpriseAPI = (data) => {
  return request({
    url: '/park/enterprise/',
    method: 'PUT',
    data
  })
}
/**
 * 删除企业
 * @param {*} params
 * @returns
 */
export const delExterpriseAPI = (id) => {
  return request({
    url: '/park/enterprise/' + id,
    method: 'DELETE'
  })
}
/**
 * 获取楼宇列表
 * @param {*} params
 * @returns
 */
export const getRentBuildListAPI = () => {
  return request({
    url: '/park/rent/building'
  })
}
/**
 * 创建合同
 * @param {*} params
 * @returns
 */
export const createRentAPI = (data) => {
  return request({
    url: '/park/enterprise/rent',
    method: 'POST',
    data
  })
}
/**
 * 获取合同列表
 * @param {*} params
 * @returns
 */
export const getRentListAPI = (id) => {
  return request({
    url: '/park/enterprise/rent/' + id
  })
}
/**
 * 退租
 * @param {*} params
 * @returns
 */
export const outRentAPI = (rentId) => {
  return request({
    url: '/park/enterprise/rent/' + rentId,
    method: 'PUT'
  })
}
/**
 * 查看企业详情
 * @param {*} params
 * @returns
 */
export const getEnterpriseDetail = (id) => {
  return request({
    url: '/park/enterprise/rent/' + id,
    method: 'GET'
  })
}

