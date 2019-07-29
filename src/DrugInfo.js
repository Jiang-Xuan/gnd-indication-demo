import React from 'react'
import { Chart, Geom, Axis, Tooltip, Legend, Label } from 'bizcharts'
import DataSet from '@antv/data-set'
import { reduceFieldsOfObj, renderAmountInPlot } from './utils'
import { Button } from 'antd';

const mockData = [
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

window.test = rrr => {
  console.log(rrr)
}

function DrugInfo() {
  const [data, setData] = React.useState(mockData)

  const stageData = reduceFieldsOfObj(data, fields)

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
            htmlTemplate={renderAmountInPlot('数量', fields.length, (index, item) => {
              console.log(index)
              return `
                <a class="GND-Chart-totalInPillar" style="white-space:nowrap">${
                  stageData[item.point['阶段']]
                }</a>
              `
            })}
          />
        </Geom>
      </Chart>
    </div>
  )
}

export default DrugInfo
