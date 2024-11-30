import request from '@/utils/request'
/**
 * 获取规则列表
 * @param {*} params
 * @returns
 */
export const getRuleListAPI = (params) => {
  return request({
    url: '/parking/rule/list',
    method: 'GET',
    params
  })
}
/**
 * 创建规则
 * @param {*} params
 * @returns
 */
export const createRuleAPI = (data) => {
  return request({
    url: '/parking/rule',
    method: 'POST',
    data
  })
}
/**
 * 查看规则
 * @param {*} params
 * @returns
 */
export const checkRuleAPI = (id) => {
  return request({
    url: '/parking/rule/' + id
  })
}
/**
 * 编辑规则
 * @param {*} params
 * @returns
 */
export const editRuleAPI = (data) => {
  return request({
    url: '/parking/rule',
    method: 'PUT',
    data
  })
}
