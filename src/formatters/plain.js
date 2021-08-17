import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isBoolean(value)) return value;
  if (_.isNumber(value)) return value;
  if (_.isNull(value)) return 'null';
  return `'${value}'`;
};

const formatPlain = (ast, key = []) => _.compact(ast.map((element) => {
  switch (element.type) {
    case 'nested':
      return formatPlain(element.children, [...key, element.key]);
    case 'added':
      return `Property '${[...key, element.key].join('.')}' was added with value: ${stringify(element.value)}`;
    case 'removed':
      return `Property '${[...key, element.key].join('.')}' was removed`;
    case 'updated':
      return `Property '${[...key, element.key].join('.')}' was updated. From ${stringify(element.oldValue)} to ${stringify(element.newValue)}`;
    default:
      return '';
  }
})).join('\n');

export default formatPlain;
