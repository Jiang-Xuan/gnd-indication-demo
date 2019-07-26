import { reduceFieldsOfObj, isRenderAmountInPlot } from './utils'

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

describe('isRenderAmountInPlot', () => {
  const objKey = 'amount'
  test('return a function', () => {
    expect(isRenderAmountInPlot()).toBeInstanceOf(Function)
  })

  test('returned function need three argument', () => {
    expect(isRenderAmountInPlot().length).toBe(3)
  })

  test('when every has amount', () => {
    const pillars = 2
    const data = [
      { amount: 6 }, // 0
      { amount: 7 }, // 1
      { amount: 6 }, // 2
      { amount: 7 } // 3
    ]
    const shouldRender = jest.fn()

    data.forEach((item, index) => {
      isRenderAmountInPlot(objKey, pillars, shouldRender)('TEST', item, index)
    })

    console.log(expect(shouldRender))

    expect(shouldRender).toBeCalledTimes(2)

    expect(shouldRender.mock.calls[0]).toEqual([0, { amount: 6 }])
    expect(shouldRender).toHaveBeenNthCalledWith(2, 2, { amount: 6 })
  })

  test('when someone not has amount', () => {
    const pillars = 2
    const data = [
      //                         第一个柱子  第二个柱子
      { amount: 6 }, //    0       | 0 |   | 1 |
      { noAmount: '' }, // 1       | 2 |   | 3 |
      { noAmount: '' }, // 2       |   |   |   |
      { amount: 7 } //     3     ------------------
    ]
    const shouldRender = jest.fn()

    data.forEach((item, index) => {
      isRenderAmountInPlot(objKey, pillars, shouldRender)('TEST', item, index)
    })

    expect(shouldRender).toHaveBeenNthCalledWith(1, 0, { amount: 6 })
    expect(shouldRender).toHaveBeenNthCalledWith(2, 3, { amount: 7 })
  })
})
