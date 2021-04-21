import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isBoolean(value)) return value;
  if (_.isNull(value)) return 'null';
  return `'${value}'`;
};

const plainMapper = (elem, path) => {
  switch (elem.type) {
    case 'nested':
      return elem.children.map((element) => plainMapper(element, [...path, elem.key]));
      // возврат строки потом просто объединение
    case 'added':
      return `Property '${[...path, elem.key].join('.')}' was added with value: ${stringify(elem.value)}`;
    case 'removed':
      return `Property '${[...path, elem.key].join('.')}' was removed`;
    case 'updated':
      return `Property '${[...path, elem.key].join('.')}' was updated. From ${stringify(elem.valuePrevious)} to ${stringify(elem.valueNext)}`;
    default:
      return '';
  }
};

export default (ast) => _.compact(ast.map((elem) => plainMapper(elem, [])).flat(Infinity)).join('\n');
