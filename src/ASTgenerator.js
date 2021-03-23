import _ from 'lodash';

const abstractSyntaxTreeGenerate = (data1, data2) => {
  const nodeGenerate = (type, key, value) => {
    const result = { type, key };
    if (_.isObject(value)) {
      result.children = Object.entries(value).map(([a, b]) => nodeGenerate('stabled', a, b));
    } else {
      result.value = value;
    }
    return result;
  };

  const nodeGenerateUpdatedType = (key, valuePrevious, valueNext) => ({
    type: 'updated',
    key,
    valuePrevious: _.isObject(valuePrevious) ? Object.entries(valuePrevious).map(([a, b]) => nodeGenerate('stabled', a, b)) : valuePrevious,
    valueNext: _.isObject(valueNext) ? Object.entries(valueNext).map(([a, b]) => nodeGenerate('stabled', a, b)) : valueNext,
  });

  const diffObjects = [
    {
      check: (key) => _.isEqual(data1[key], data2[key]),
      action: (key) => nodeGenerate('stabled', key, data1[key]),
    },
    {
      check: (key) => _.isObject(data1[key]) && _.isObject(data2[key]),
      action: (key) => ({ type: 'stabled', key, children: abstractSyntaxTreeGenerate(data1[key], data2[key]) }),
    },
    {
      check: (key) => !(key in data1) && (key in data2),
      action: (key) => nodeGenerate('added', key, data2[key]),
    },
    {
      check: (key) => (key in data1) && !(key in data2),
      action: (key) => nodeGenerate('removed', key, data1[key]),
    },
    {
      check: () => true,
      action: (key) => nodeGenerateUpdatedType(key, data1[key], data2[key]),
    },
  ];

  const keysUnion = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return keysUnion.map((key) => diffObjects.find((elem) => elem.check(key)).action(key));
};

export default abstractSyntaxTreeGenerate;
