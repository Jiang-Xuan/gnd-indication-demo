import React from 'react'
import { Chart, Geom, Axis, Tooltip, Legend, Label } from 'bizcharts'
import DataSet from '@antv/data-set'
import { reduceFieldsOfObj } from './utils'

const data = [
  {
    药品全球研发阶段: '临床前',
    临床前: 5,
    临床0期: 6,
    临床I期: 98
  },
  {
    药品全球研发阶段: '临床0期',
    临床前: 56,
    临床0期: 34,
    临床I期: 98
  },
  {
    药品全球研发阶段: '临床I期',
    临床前: 56,
    临床I期: 98
  },
  {
    药品全球研发阶段: '临床II期',
    临床前: 56,
    临床I期: 98,
    临床II期: 99
  }
]

const fields = ['临床前', '临床0期', '临床I期', '临床II期']

const stageData = reduceFieldsOfObj(data, fields)

window.test = rrr => {
  console.log(rrr)
}

const drawMap = {}

function DrugInfo() {
  const ds = new DataSet()
  const dv = ds.createView().source(data)
  dv.transform({
    type: 'fold',
    fields: fields,
    key: '阶段',
    value: '数量'
  })
  // console.log(dv)

  const handlePlotClick = event => {
    // console.log(event)
    // window.open('https://www.bing.com', '_target')
  }

  return (
    <div>
      <Chart
        onPlotClick={handlePlotClick}
        data={dv}
        height={400}
        forceFit
        onTooltipChange={event => {
          // // let items = event.items
          // // items = items.map(item => {
          // //   return {
          // //     ...item,
          // //     title: `药品-${item.name}`
          // //   }
          // // })
          // // return items
          // event.items = event.items.map(item => ({
          //   ...item,
          //   name: '555'
          // }))
          const itemsLength = event.items.length

          //  只能这样设置, 请勿使用上面注释中的方式来修改
          // 看起来是应为 event.items 对象不能被覆盖式的修改
          for (let i = 0; i < itemsLength; i++) {
            event.items[i].name = `药品-${event.items[i].name}`
          }
        }}
      >
        <Legend itemFormatter={val => `药品-${val}`} />
        <Axis name="阶段" label={{ dataType: 'x' }} />
        <Axis name="数量" label={{ dataType: 'y' }} />
        <Tooltip />
        <Geom
          type="intervalStack"
          position="阶段*数量"
          color="药品全球研发阶段"
          active={[
            true,
            {
              highlight: true
            }
          ]}
        >
          <Label
            content="临床前"
            htmlTemplate={(text, item, index) => {
              console.log(index, stageData[item.point['阶段']])

              /** 当前处在的柱子的索引值, 从 0 开始 */
              const pillarIndex = index % fields.length
              console.log('当前数据处在的柱子的索引值:', pillarIndex)
              console.log('当前的 shape 块的值:', item.point['数量'])

              if (index < fields.length) {
                // 处在第一层数据中, 如果有数据, 说明还图形存在,
                // 将总数绘制于这个图形之上
                if (item.point['数量']) {
                  // 存下该柱子已经被绘制
                  drawMap[pillarIndex] = true
                  console.log(item.point)
                  return `<a class="GND-Chart-totalInPillar" style="white-space:nowrap">${
                    stageData[item.point['阶段']]
                  }</a>`
                } else {
                  // 说明底层还会有数据, 跳过不绘制
                  return
                }
              } else {
                // 如果该柱子还没有被绘制
                if (!drawMap[pillarIndex]) {
                  // 并且该 shape 有数据
                  if (item.point['数量']) {
                    drawMap[pillarIndex] = true
                    return `<a class="GND-Chart-totalInPillar" onclick="test(444)" style="white-space:nowrap">${
                      stageData[item.point['阶段']]
                    }</a>`
                  }
                }
              }
            }}
          />
        </Geom>
      </Chart>
    </div>
  )
}

export default DrugInfo
