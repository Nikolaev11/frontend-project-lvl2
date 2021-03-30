import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isBoolean(value)) return value;
  if (_.isNull(value)) return 'null';
  return `'${value}'`;
};

export default (abstractSyntaxTree) => {
  const plainMapper = (key) => {
    const stringGenereate = (elem) => {
      switch (elem.type) {
        case 'nested':
          return elem.children.map(plainMapper([...key, elem.key]));
        case 'added':
          return `Property '${[...key, elem.key].join('.')}' was added with value: ${stringify(elem.value)}`;
        case 'removed':
          return `Property '${[...key, elem.key].join('.')}' was removed`;
        case 'updated':
          return `Property '${[...key, elem.key].join('.')}' was updated. From ${stringify(elem.valuePrevious)} to ${stringify(elem.valueNext)}`;
        default:
          return null;
      }
    };
    return stringGenereate;
  };
  return _.compact(_.flattenDeep(abstractSyntaxTree.map(plainMapper([])))).join('\n');
};
