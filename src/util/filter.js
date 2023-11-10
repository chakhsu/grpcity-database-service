import { Op } from 'sequelize'

const handleTerm = (term) => {
  const result = []
  if (term && term.length > 0) {
    term.forEach(t => {
      const { key, stringValue, numberValue, stringLike } = t
      if (key) {
        const kv = {}
        if (stringValue) { kv[key] = stringValue }
        if (stringLike) { kv[key] = { [Op.like]: stringLike } }
        if (numberValue) { kv[key] = numberValue }
        result.push(kv)
      }
    })
  }
  return result
}

const handleRange = (range) => {
  const result = []
  if (range && range.length > 0) {
    range.forEach(r => {
      const { key, eq, ne, gt, gte, lt, lte } = r
      if (key) {
        const kv = { [key]: {} }
        // 等于
        if (eq) { kv[key][Op.eq] = eq }
        // 不等于
        if (ne) { kv[key][Op.ne] = ne }
        // 大于
        if (gt) { kv[key][Op.gt] = gt }
        // 大于或等于
        if (gte) { kv[key][Op.gte] = gte }
        // 小于
        if (lt) { kv[key][Op.lt] = lt }
        // 小于或等于
        if (lte) { kv[key][Op.lte] = lte }
        result.push(kv)
      }
    })
  }
  return result
}

const handleFilter = (filter) => {
  // 默认过滤掉 isDelete 为 1 的数据
  let where = { isDelete: { [Op.ne]: 1 } }

  const { and, or, term, range } = filter

  if (term) {
    const filterByTerm = handleTerm(term)
    filterByTerm.forEach(t => { where = Object.assign({}, t, where) })
  }

  if (range) {
    const filterByRange = handleRange(range)
    filterByRange.forEach(r => { where = Object.assign({}, r, where) })
  }

  if (and) {
    const { term, range } = and
    const andTerm = handleTerm(term)
    const andRange = handleRange(range)
    where = Object.assign({ [Op.and]: [...andTerm, ...andRange] }, where)
  }

  if (or) {
    const { term, range } = or
    const orTerm = handleTerm(term)
    const orRange = handleRange(range)
    where = Object.assign({ [Op.or]: [...orTerm, ...orRange] }, where)
  }

  return where
}

export {
  handleTerm,
  handleRange,
  handleFilter
}
