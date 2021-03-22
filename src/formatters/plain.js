import _ from 'lodash';

const valueToString = (inputValue) => {
  if (_.isObject(inputValue)) return '[complex value]';
  if (_.isBoolean(inputValue)) return inputValue;
  if (_.isNull(inputValue)) return 'null';
  return `'${inputValue}'`;
};

export default (inpArr) => {
  const elementPath = [];
  const plainMaper = (element) => {
    let result;
    switch (element.type) {
      case 'stabled':
        if (Array.isArray(element.value)) {
          elementPath.push(element.key);
          result = element.value.map(plainMaper);
          elementPath.pop();
        }
        break;
      case 'added':
        elementPath.push(element.key);
        result = `Property '${elementPath.join('.')}' was added with value: ${valueToString(element.value)}`;
        elementPath.pop();
        break;
      case 'removed':
        elementPath.push(element.key);
        result = `Property '${elementPath.join('.')}' was removed`;
        elementPath.pop();
        break;
      case 'updated':
        elementPath.push(element.key);
        result = `Property '${elementPath.join('.')}' was updated. From ${valueToString(element.value1)} to ${valueToString(element.value2)}`;
        elementPath.pop();
        break;
      default: return null;
    }
    return result;
  };
  return _.compact(_.flattenDeep(inpArr.map(plainMaper))).join('\n');
};
