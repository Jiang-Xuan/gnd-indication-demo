import React from 'react'
import { Chart, Geom, Axis, Tooltip, Legend, Label } from 'bizcharts'
import DataSet from '@antv/data-set'
import { reduceFieldsOfObj, renderAmountInPlot } from './utils'
import { Radio } from 'antd';

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

window.handleClickAmountInPolt = (event, stage, id) => {
  console.log(event, stage, id)
  window.open(`javascript: alert('阶段: ${stage}, 适应症Id: ${id}');window.close()`, '_blank')
}

function DrugInfo() {
  const [mode, setMode] = React.useState('active')

  const stageData = reduceFieldsOfObj(mockData, fields)
  const ds = new DataSet()
  const dv = ds.createView().source(mockData)
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

  const handleModeChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <div className="Box mb-4">
      <div className="Box-header">
        药品关系图表
      </div>
      <div className="Box-body">
        <div className="mb-2">
          <span>色块 hover 模式: </span>
          <Radio.Group onChange={handleModeChange} value={mode}>
            <Radio value={'active'}>激活</Radio>
            <Radio value={'highlight'}>高亮</Radio>
          </Radio.Group>
        </div>
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
                highlight: mode === 'highlight',
              }
            ]}
          >
            <Label
              content="临床前"
              htmlTemplate={renderAmountInPlot('数量', fields.length, (index, item) => {
                const stage = item.point['阶段']
                return `
                  <a
                    class="GND-Chart-totalInPillar"
                    style="white-space:nowrap"
                    onclick="handleClickAmountInPolt(event, '${stage}', 786)"
                  >${
                    stageData[stage]
                  }</a>
                `
              })}
            />
          </Geom>
        </Chart>
      </div>
    </div>
  )
}

export default DrugInfo
