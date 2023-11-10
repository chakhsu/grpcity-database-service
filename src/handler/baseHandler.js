import assert from 'node:assert'
import mysql from '../lib/mysql.js'
import { handleFilter } from '../util/filter.js'

class BaseHandler {
  constructor (modelName) {
    this.modelName = modelName
  }

  // 增: 增加一条
  async createOne (call) {
    assert(call.request[this.modelName], 'baseHandler createOne(), params no modelName key')

    call.request[this.modelName] = [call.request[this.modelName]]
    const result = await this.bulkCreate(call)
    result.id = result.id[0]
    return result
  }

  // 增: 批量增加
  async bulkCreate (call) {
    assert(call.request[this.modelName], 'baseHandler bulkCreate(), params no modelName key')
    assert(call.request[this.modelName].length > 0, 'baseHandler bulkCreate(), params array length should be more than 0')

    const result = await mysql.getInstance(this.modelName).bulkCreate(call.request[this.modelName])
    return { id: result.map(r => r.id) }
  }

  async searchById (call) {
    const { id } = call.request
    assert(id, 'baseHandler searchById() parmas no content % id')

    const filter = { term: [{ key: 'id', stringValue: [id] }] }
    const pagination = { size: 1 }

    const result = await this.search({ request: { filter, pagination } })
    return { [this.modelName]: result.list[0] ? result.list[0] : {} }
  }

  // 默认：返回结果不包含 isDelete 字段
  // 默认：返回结果排序按 updateTime 进行降序 desc
  // 默认：返回结果最大条目数 limit 10
  async search (call) {
    const { filter, order = {}, pagination = {} } = call.request
    assert(filter, 'baseHandler search() parmas no filter')

    const where = handleFilter(filter)
    const { page = 1, size: limit = 10 } = pagination
    const offset = page > 1 ? (page - 1) * limit : 0
    const { field = 'updateTime', sort = 'DESC' } = order
    const attributes = { exclude: ['isDelete'] }
    const options = Object.assign({}, { offset, limit, attributes, order: [[field, sort]], where })

    const { count, rows } = await mysql.getInstance(this.modelName).findAndCountAll(options) || {}
    return { total: count || 0, list: rows || [] }
  }

  // 改：单条修改
  async updateById (call) {
    const { [this.modelName]: content, id } = call.request
    assert(content && id, 'baseHandler updateById() parmas no content % id')

    const result = await this.update({
      request: {
        filter: { term: [{ key: 'id', stringValue: [id] }] },
        [this.modelName]: content
      }
    })
    return result
  }

  // 改：多条修改, 默认过滤掉 isDelete
  async update (call) {
    const { [this.modelName]: content, filter } = call.request
    assert(content && filter, 'baseHandler update() parmas no content or where')

    const where = handleFilter(filter)

    const result = await mysql.getInstance(this.modelName).update(content, { where })
    return { affectedRowCount: result[0] }
  }

  // 删：单条逻辑删除，标记 isDelete
  async deleteById (call) {
    const { id } = call.request
    assert(id, 'baseHandler deleteOne() parmas no id')

    const result = await this.delete({
      request: {
        filter: { term: [{ key: 'id', stringValue: [id] }] }
      }
    })
    return result
  }

  // 删：多条逻辑删除，标记 isDelete
  async delete (call) {
    const { filter } = call.request
    assert(filter, 'baseHandler delete() parmas no filter')

    const where = handleFilter(filter)

    // 逻辑删除标记 isDelete 字段为 1
    const result = await mysql.getInstance(this.modelName).update({ isDelete: 1 }, { where })
    return { affectedRowCount: result[0] }
  }
}

export default BaseHandler
