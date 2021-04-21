import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isBoolean(value)) return value;
  if (_.isNumber(value)) return value;
  if (_.isNull(value)) return 'null';
  return `'${value}'`;
};

const plain = (ast, key = []) => _.compact(ast.map((elem) => {
  switch (elem.type) {
    case 'nested':
      return plain(elem.children, [...key, elem.key]);
    case 'added':
      return `Property '${[...key, elem.key].join('.')}' was added with value: ${stringify(elem.value)}`;
    case 'removed':
      return `Property '${[...key, elem.key].join('.')}' was removed`;
    case 'updated':
      return `Property '${[...key, elem.key].join('.')}' was updated. From ${stringify(elem.valuePrevious)} to ${stringify(elem.valueNext)}`;
    default:
      return '';
  }
})).join('\n');

export default plain;
