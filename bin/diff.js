import _ from 'lodash';

const diff = (inp1, inp2) => {
  const inputKeysArray = _.sortBy(_.uniq([...Object.keys(inp1), ...Object.keys(inp2)], 'A'));
  // console.log(inputKeysArray);
  const arr = inputKeysArray.reduce((acc, key) => {
    if (key in inp1 && key in inp2) {
      if (inp1[key] === inp2[key]) {
        acc.push(`  ${key}: ${inp1[key]}`);
      } else {
        acc.push(`- ${key}: ${inp1[key]}`);
        acc.push(`+ ${key}: ${inp2[key]}`);
      }
      return acc;
    }
    if (key in inp1) {
      acc.push(`- ${key}: ${inp1[key]}`);
    }
    if (key in inp2) {
      acc.push(`+ ${key}: ${inp2[key]}`);
    }
    return acc;
  }, []);
  return `{\n  ${arr.join('\n  ')}\n}`;
};

export default diff;
