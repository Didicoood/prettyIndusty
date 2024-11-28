import request from '@/utils/request'
/**
 * 获取月卡列表
 * @param {*} params
 * @returns
 */
export const getCardListAPI = (params) => {
  return request({
    url: '/parking/card/list',
    params
  })
}
/**
 * 添加月卡
 * @param {*} data
 * @returns
 */
export const createCardAPI = (data) => {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}
/**
 * 获取月卡详情
 * @param {*} id
 * @returns
 */
export const getCardDetailAPI = (id) => {
  return request({
    url: '/parking/card/detail/' + id

  })
}
/**
 * 删除月卡
 * @param {} id
 * @returns
 */
export const delCardAPI = (idList) => {
  return request({
    url: `parking/card/${idList.join(',')}`,
    method: 'DELETE'

  })
}
/**
 * 更新月卡
 * @param {*} data
 * @returns
 */
export const updateCardAPI = (data) => {
  return request({
    url: '/parking/card/edit',
    method: 'PUT',
    data
  })
}
