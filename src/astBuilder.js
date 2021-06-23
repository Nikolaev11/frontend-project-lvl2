import _ from 'lodash';

const buildAst = (data1, data2) => {
  const typeMapper = [
    {
      check: (key) => _.isObject(data1[key]) && _.isObject(data2[key]),
      action: ({
        key, value1, value2, astBuilder,
      }) => ({ type: 'nested', key, children: astBuilder(value1, value2) }),
    },
    {
      check: (key) => _.isEqual(data1[key], data2[key]),
      action: ({ key, value1 }) => ({ type: 'unchanged', key, value: value1 }),
    },
    {
      check: (key) => !_.has(data1, key) && _.has(data2, key),
      action: ({ key, value2 }) => ({ type: 'added', key, value: value2 }),
    },
    {
      check: (key) => _.has(data1, key) && !_.has(data2, key),
      action: ({ key, value1 }) => ({ type: 'removed', key, value: value1 }),
    },
    {
      check: () => true,
      action: ({ key, value1, value2 }) => ({
        type: 'updated', key, valuePrevious: value1, valueNext: value2,
      }),
    },
  ];

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => typeMapper.find((elem) => elem.check(key))
    .action({
      key, value1: data1[key], value2: data2[key], astBuilder: buildAst,
    }));
};

export default buildAst;
