import _ from 'lodash'; //

const abstractSyntaxTreeGenerate = (data1, data2) => {
  const typeMapper = [
    {
      check: (key) => _.isObject(data1[key]) && _.isObject(data2[key]),
      action: (key) => ({ type: 'nested', key, children: abstractSyntaxTreeGenerate(data1[key], data2[key]) }),
    },
    {
      check: (key) => _.isEqual(data1[key], data2[key]),
      action: (key) => ({ type: 'unchanged', key, value: data1[key] }),
    },
    {
      check: (key) => !(key in data1) && (key in data2),
      action: (key) => ({ type: 'added', key, value: data2[key] }),
    },
    {
      check: (key) => (key in data1) && !(key in data2),
      action: (key) => ({ type: 'removed', key, value: data1[key] }),
    },
    {
      check: () => true,
      action: (key) => ({
        type: 'updated', key, valuePrevious: data1[key], valueNext: data2[key],
      }),
    },
  ];

  const keysUnion = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keysUnion.map((key) => typeMapper.find((elem) => elem.check(key)).action(key));
};

export default abstractSyntaxTreeGenerate;
