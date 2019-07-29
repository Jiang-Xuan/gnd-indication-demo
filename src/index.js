import React from 'react'
import ReactDOM from 'react-dom'
import { Chart, Geom, Axis, Tooltip, Label } from 'bizcharts'
import { Pagination, LocaleProvider, Alert, Radio } from 'antd'
import zhCn from 'antd/lib/locale-provider/zh_CN'
import { data } from './mockData'
import DrugInfo from './DrugInfo'

import 'antd/dist/antd.css'

import './styles.css'

/**
 * @description 活跃状态下的阶段的颜色, 由浅至深
 * @type {string[]}
 */
const activeColors = [
  '#d0f0ff',
  '#b4e3fd',
  '#91d5ff',
  '#40a9ff',
  '#0a6dd9',
  '#0050b3',
  '#002766'
]

const inactiveColors = [
  '#fff0a3',
  '#ffe58f',
  '#ffd667',
  '#faad15',
  '#d48806',
  '#ad6800',
  '#613401'
]

// 从 data 中抽离出 阶段 axis
/**
 * @description 阶段轴 数据
 * @type {string[]}
 * ['临床前', '临床0期']
 */
const stageAxis = []
/**
 * @description 阶段 name 在 stageAxis 中的索引值
 */
const stageName2IndexMap = {}

data.forEach(item => {
  const { stage } = item
  if (!stageAxis.includes(stage.name)) {
    stageName2IndexMap[stage.name] = stageAxis.length
    stageAxis.push(stage.name)
  }
})

// 从 data 轴抽离出 target axis
/**
 * @description 靶点轴 数据
 * @type {string[]}
 * ['PD-1', 'PD-2']
 */
const targetAxis = []
const targetName2IndexMap = {}

data.forEach(item => {
  const { target } = item
  if (!targetAxis.includes(target.name)) {
    targetName2IndexMap[target.name] = targetAxis.length
    targetAxis.push(target.name)
  }
})

// 处理 data 数据来 生成 Chart 组件需要的 data
const chartData = []

data.forEach(item => {
  const { stage, target, drugAmount } = item

  chartData.push({
    stage: stageName2IndexMap[stage.name],
    target: targetName2IndexMap[target.name],
    drugAmount,
    stageStatus: stage.status
  })
})

// 获取 活跃(active) & 非活跃(inactive) 的 min & max drugAmount
const activeExtreme = [0, 0]
const inactiveExtreme = [0, 0]

data.forEach(item => {
  const { stage, drugAmount } = item

  // 活跃状态的数据
  if (stage.status === 'active') {
    const [min, max] = activeExtreme

    if (drugAmount < min) {
      activeExtreme[0] = drugAmount
    } else if (drugAmount > max) {
      activeExtreme[1] = drugAmount
    }
  } else if (stage.status === 'inactive') {
    const [min, max] = inactiveExtreme
    if (drugAmount < min) {
      inactiveExtreme[0] = drugAmount
    } else if (drugAmount > max) {
      inactiveExtreme[1] = drugAmount
    }
  }
})

function App() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [data, setData] = React.useState(chartData.slice(0, 10))
  const [mode, setMode] = React.useState('active')

  const handlePlotClick = event => {
    // 传递参数 药品名&药品ID&阶段(stage)&靶点(target)
    // window.open('http://www.bing.com', '_blank')
    console.log(event)
  }

  const handlePaginationChange = event => {
    setCurrentPage(event)
    setData(
      chartData.slice(
        Math.round(Math.random() * 5) + 1,
        Math.round(Math.random() * chartData.length) - 1
      )
    )
  }

  const handleModeChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <LocaleProvider locale={zhCn}>
      <div className="mx-6">
        <DrugInfo />
        <div className="Box">
          <div className="Box-header">
            靶点关系图表
          </div>
          <div className="Box-body">
            <Alert showIcon className="mb-2"
              message="PD-1, PD-2, PD-3等靶点支持 click, 暂不支持 hover 状态, 建议添加引导来告知用户靶点可点"
              type="warning"
            />
            <div className="mb-2">
              <span>色块 hover 模式: </span>
              <Radio.Group onChange={handleModeChange} value={mode}>
                <Radio value={'active'}>激活</Radio>
                <Radio value={'highlight'}>高亮</Radio>
              </Radio.Group>
            </div>
            <Chart
              data={data}
              padding="auto"
              scale={{
                stage: {
                  type: 'cat',
                  values: stageAxis
                },
                target: {
                  type: 'cat',
                  values: targetAxis
                }
              }}
              height={200}
              forceFit
              onPlotClick={handlePlotClick}
            >
              <Axis name="stage" position="top" />
              <Axis name="target" />
              <Geom
                type="polygon"
                position="stage*target"
                tooltip={[
                  'drugAmount',
                  drugAmount => {
                    return {
                      name: '药品数量',
                      value: drugAmount
                    }
                  }
                ]}
                active={[true, {
                  highlight: mode === 'highlight',
                }]}
                color={[
                  'drugAmount*stageStatus',
                  (drugAmount, stageStatus) => {
                    if (stageStatus === 'active') {
                      const [, max] = activeExtreme
                      const piece = max / activeColors.length

                      let pieceIndex = Number.parseInt(drugAmount / piece, 10)
                      if (pieceIndex === 0) {
                        pieceIndex = 1
                      }
                      return activeColors[pieceIndex - 1]
                    } else if (stageStatus === 'inactive') {
                      const [, max] = inactiveExtreme
                      const piece = max / inactiveColors.length

                      let pieceIndex = Number.parseInt(drugAmount / piece, 10)
                      if (pieceIndex === 0) {
                        pieceIndex = 1
                      }
                      return inactiveColors[pieceIndex - 1]
                    }
                  }
                ]}
              >
                <Tooltip />
                <Label
                  textStyle={{
                    fill: '#fff',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)'
                  }}
                  offset={-2}
                  content="drugAmount"
                />
              </Geom>
            </Chart>
            <Pagination
              onChange={handlePaginationChange}
              showQuickJumper
              total={400}
              current={currentPage}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </LocaleProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
