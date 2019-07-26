const toString = Object.prototype.toString

/**
 * @param {{}[]} data
 * @param {string[]} fields
 */
export const reduceFieldsOfObj = (datas, fields) => {
  if (toString.call(datas) !== '[object Array]') {
    throw new Error('第一个参数必须为 Array')
  }

  if (toString.call(fields) !== '[object Array]') {
    throw new Error('第二个参数必须为 Array')
  }

  const result = {}

  fields.forEach(field => {
    datas.forEach(data => {
      if (data[field]) {
        result[field] = (result[field] || 0) + data[field]
      }
    })
  })

  return result
}

export const isRenderAmountInPlot = () => {
  return (test, item, index) => {}
}
