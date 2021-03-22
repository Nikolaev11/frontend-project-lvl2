import _ from 'lodash';

const abstractSyntaxTreeGenerate = (data1, data2) => {
  const stabled = (value) => (_.isObject(value) ? Object.entries(value).map(([a, b]) => ({ type: 'stabled', key: a, value: stabled(b) })) : value);
  const diffObjects = [
    {
      check: (key) => _.isEqual(data1[key], data2[key]),
      nodeGenerate: (key) => ({ type: 'stabled', key, value: stabled(data1[key]) }),
    },
    {
      check: (key) => _.isObject(data1[key]) && _.isObject(data2[key]),
      nodeGenerate: (key) => ({ type: 'stabled', key, value: abstractSyntaxTreeGenerate(data1[key], data2[key]) }), // children type
    },
    {
      check: (key) => !(key in data1) && (key in data2),
      nodeGenerate: (key) => ({ type: 'added', key, value: stabled(data2[key]) }),
    },
    {
      check: (key) => (key in data1) && !(key in data2),
      nodeGenerate: (key) => ({ type: 'removed', key, value: stabled(data1[key]) }),
    },
    {
      check: () => true,
      nodeGenerate: (key) => ({
        type: 'updated', key, value1: stabled(data1[key]), value2: stabled(data2[key]), // valuePreviouss valueNext
      })
      ,
    },
  ];

  const keysUnion = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const result = keysUnion
    .map((key) => diffObjects.find((elem) => elem.check(key)).nodeGenerate(key));
  return result;
};

export default abstractSyntaxTreeGenerate;
