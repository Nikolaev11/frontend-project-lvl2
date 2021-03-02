import _ from 'lodash';

const diff = (inp1, inp2) => {
  const addWithoutDiff = (obj) => {
    if (!_.isObject(obj)) {
      return obj;
    }
    const f5 = (accumulator, elem) => {
      const [key, value] = elem;
      if (_.isObject(value)) {
        accumulator.push(`  ${key}:`);
        accumulator.push(Object.entries(value).reduce(f5, []));
      } else {
        accumulator.push(`  ${key}: ${value}`);
      }
      return accumulator;
    };
    return Object.entries(obj).reduce(f5, []);
  };

  const f2 = (acc, key) => {
    if (key in inp1 && key in inp2) {
      if (_.isObject(inp1[key]) && _.isObject(inp2[key])) {
        acc.push(`  ${key}:`);
        acc.push(diff(inp1[key], inp2[key]));
      }
      if (!_.isObject(inp1[key]) && _.isObject(inp2[key])) {
        acc.push(`- ${key}: ${addWithoutDiff(inp1[key])}`);
        acc.push(`- ${key}:`);
        acc.push(addWithoutDiff(inp2[key]));
      }
      if (_.isObject(inp1[key]) && !_.isObject(inp2[key])) {
        acc.push(`- ${key}:`);
        acc.push(addWithoutDiff(inp1[key]));
        acc.push(`+ ${key}: ${addWithoutDiff(inp2[key])}`);
      }
      if (!_.isObject(inp1[key]) && !_.isObject(inp2[key])) {
        if (inp1[key] === inp2[key]) {
          acc.push(`  ${key}: ${inp1[key]}`);
          return acc;
        }
        if (key in inp1) {
          acc.push(`- ${key}: ${inp1[key]}`);
        }
        if (key in inp2) {
          acc.push(`+ ${key}: ${inp2[key]}`);
        }
        return acc;
      }
      return acc;
    }
    if (key in inp1) {
      if (_.isObject(inp1[key])) {
        acc.push(`- ${key}:`);
        acc.push(addWithoutDiff(inp1[key]));
      } else {
        acc.push(`- ${key}: ${inp1[key]}`);
      }
    }
    if (key in inp2) {
      if (_.isObject(inp2[key])) {
        acc.push(`+ ${key}:`);
        acc.push(addWithoutDiff(inp2[key]));
      } else {
        acc.push(`+ ${key}: ${inp2[key]}`);
      }
    }
    return acc;
  };

  const inputKeysArray = _.sortBy(_.uniq([...Object.keys(inp1), ...Object.keys(inp2)], 'A'));
  // console.log(inputKeysArray);
  const arr = inputKeysArray.reduce(f2, []);
  // console.log(arr);
  return arr;
};
export default diff;
