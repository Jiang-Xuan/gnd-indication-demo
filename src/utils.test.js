import { reduceFieldsOfObj, renderAmountInPlot } from './utils'

describe('reduceFieldsOfObj', () => {
  test('第一个参数不是数组时抛出错误', () => {
    expect(() => reduceFieldsOfObj({}, ['a', 'b'])).toThrow(/第一个/)
  })

  test('第二个参数不是数组的时候抛出错误', () => {
    expect(() => reduceFieldsOfObj([], {})).toThrow(/第二个/)
  })

  test('统计数组中的对象中的字段', () => {
    const data = [
      {
        name: 'Foo',
        a: 1,
        b: 2,
        c: 3
      },
      {
        name: 'Bar',
        a: 4,
        b: 6,
        c: 9
      }
    ]

    const fields = ['a', 'b', 'c']

    expect(reduceFieldsOfObj(data, fields)).toEqual({
      a: 5,
      b: 8,
      c: 12
    })
  })
})

describe('when pillars = 2 renderAmountInPlot', () => {
  const objKey = 'amount'
  const pillars = 2
  test('return a function', () => {
    expect(renderAmountInPlot()).toBeInstanceOf(Function)
  })

  test('returned function need three argument', () => {
    expect(renderAmountInPlot().length).toBe(3)
  })

  test('when every has key that need calc', () => {
    const data = [
      { amount: 6 }, // 0
      { amount: 7 }, // 1
      { amount: 6 }, // 2
      { amount: 7 } // 3
    ]
    const render = jest.fn()

    const returnFunction = renderAmountInPlot(objKey, pillars, render)

    data.forEach((item, index) => {
      const bizChartItem = { point: { ...item } }
      returnFunction('TEST', bizChartItem, index)
    })

    expect(render).toBeCalledTimes(2)

    expect(render).toHaveBeenNthCalledWith(1, 0, { point: { amount: 6 } })
    expect(render).toHaveBeenNthCalledWith(2, 1, { point: { amount: 7 } })
  })

  test('when someone not has key', () => {
    const data = [
      //                              第一个柱子           第二个柱子
      { amount: 6 }, //    0       | 0 - amount   |   | 1 - noAmount |
      { noAmount: '' }, // 1       | 2 - noAmount |   | 3 - amount   |
      { noAmount: '' }, // 2       |              |   |              |
      { amount: 7 } //     3     ----------------------------------------
    ]
    const shouldRender = jest.fn()

    data.forEach((item, index) => {
      const bizChartItem = { point: { ...item } }
      renderAmountInPlot(objKey, pillars, shouldRender)('TEST', bizChartItem, index)
    })

    expect(shouldRender).toHaveBeenNthCalledWith(1, 0, { point: { amount: 6 } })
    expect(shouldRender).toHaveBeenNthCalledWith(2, 3, { point: { amount: 7 } })
  })
})
