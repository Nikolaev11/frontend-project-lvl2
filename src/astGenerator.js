import _ from 'lodash'; //

const abstractSyntaxTreeGenerate = (data1, data2) => {
  const typeMapper = [
    {
      check: (key) => _.isObject(data1[key]) && _.isObject(data2[key]),
      action: (key, actionData1, actionData2) => ({ type: 'nested', key, children: abstractSyntaxTreeGenerate(actionData1, actionData2) }),
    },
    {
      check: (key) => _.isEqual(data1[key], data2[key]),
      action: (key, actionData1) => ({ type: 'unchanged', key, value: actionData1 }),
    },
    {
      check: (key) => !(key in data1) && (key in data2),
      action: (key, actionData1, actionData2) => ({ type: 'added', key, value: actionData2 }),
    },
    {
      check: (key) => (key in data1) && !(key in data2),
      action: (key, actionData1) => ({ type: 'removed', key, value: actionData1 }),
    },
    {
      check: () => true,
      action: (key, actionData1, actionData2) => ({
        type: 'updated', key, valuePrevious: actionData1, valueNext: actionData2,
      }),
    },
  ];

  const keysUnion = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keysUnion.map((key) => typeMapper.find((elem) => elem.check(key))
    .action(key, data1[key], data2[key]));
};

export default abstractSyntaxTreeGenerate;
