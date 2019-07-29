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

/**
 * 
 * @param {string} objKey 对象的 key
 * @param {number} pillars 柱子数量
 * @param {(index: number, item: {}) => void} render 
 */
export const renderAmountInPlot = (objKey, pillars, render) => {
  const drawMap = {}
  return (text, item, index) => {
    /** 当前处在的柱子的索引值, 从 0 开始 */
    const pillarIndex = index % pillars
    const pointValue = item.point[objKey]

    if (index < pillars) {
      // 处在第一层数据中, 如果有数据, 说明还图形存在,
      if (pointValue) {
        // 存下该柱子已经被绘制
        drawMap[pillarIndex] = true
        // 调用 render 回调
        return render(index, item)
      }
    } else {
      // 处在非第一层数据中, 判断该柱子是否已经被绘制
      if (
        // 如果该柱子还没有被绘制
        !drawMap[pillarIndex] &&
        // 并且该节点存在数据
        pointValue
      ) {
        // 存下该柱子已经被绘制
        drawMap[pillarIndex] = true
        // 调用 render 回调
        return render(index, item)
      }
    }

  }
}
