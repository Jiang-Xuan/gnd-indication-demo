const stages = [
  {
    name: '临床前',
    id: 0,
    status: 'active'
  },
  {
    name: '临床0期',
    id: 1,
    status: 'active'
  },
  {
    name: '临床I期',
    id: 2,
    status: 'active'
  },
  {
    name: '临床I/II期',
    id: 3,
    status: 'active'
  },
  {
    name: '临床II期',
    id: 4,
    status: 'active'
  },
  {
    name: '临床II/III期',
    id: 5,
    status: 'active'
  },
  {
    name: '临床III期',
    id: 6,
    status: 'active'
  },
  {
    name: '上市申请',
    id: 7,
    status: 'active'
  },
  {
    name: '批准上市',
    id: 8,
    status: 'active'
  },
  {
    name: '已上市',
    id: 9,
    status: 'active'
  },
  {
    name: '无进展',
    id: 10,
    status: 'inactive'
  },
  {
    name: '研发暂停',
    id: 11,
    status: 'inactive'
  },
  {
    name: '研发失败',
    id: 12,
    status: 'inactive'
  },
  {
    name: '撤销上市申请',
    id: 13,
    status: 'inactive'
  },
  {
    name: '撤市',
    id: 14,
    status: 'inactive'
  }
]

const targets = [
  {
    name: 'PD-1',
    id: 42
  },
  {
    name: 'PD-2',
    id: 43
  },
  {
    name: 'PD-3',
    id: 44
  },
  {
    name: 'PD-4',
    id: 45
  },
  {
    name: 'PD-5',
    id: 46
  },
  {
    name: 'PD-6',
    id: 47
  }
]

export const data = [
  {
    stage: stages[0],
    target: targets[0],
    drugAmount: 10
  },
  {
    //     相同阶段, 不同靶点的数据
    stage: stages[1],
    target: targets[0],
    drugAmount: 20
  },
  {
    //     不同阶段, 不同靶点的数据
    stage: stages[1],
    target: targets[1],
    drugAmount: 40
  },
  {
    stage: stages[2],
    target: targets[1],
    drugAmount: 90
  },
  {
    stage: stages[3],
    target: targets[1],
    drugAmount: 90
  },
  {
    stage: stages[4],
    target: targets[1],
    drugAmount: 200
  },
  {
    stage: stages[5],
    target: targets[1],
    drugAmount: 200
  },
  {
    stage: stages[6],
    target: targets[1],
    drugAmount: 200
  },
  {
    stage: stages[7],
    target: targets[1],
    drugAmount: 200
  },
  {
    stage: stages[8],
    target: targets[1],
    drugAmount: 200
  },
  {
    stage: stages[9],
    target: targets[1],
    drugAmount: 200
  },
  {
    stage: stages[10],
    target: targets[1],
    drugAmount: 10
  },
  {
    stage: stages[11],
    target: targets[1],
    drugAmount: 30
  },
  {
    stage: stages[12],
    target: targets[1],
    drugAmount: 60
  },
  {
    stage: stages[13],
    target: targets[1],
    drugAmount: 200
  },
  {
    stage: stages[14],
    target: targets[1],
    drugAmount: 300
  },
  {
    stage: stages[14],
    target: targets[2],
    drugAmount: 250
  },
  {
    stage: stages[14],
    target: targets[3],
    drugAmount: 500
  },
  {
    stage: stages[5],
    target: targets[3],
    drugAmount: 50
  }
]
