import _ from 'lodash';

const valueToString = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isBoolean(value)) return value;
  if (_.isNull(value)) return 'null';
  return `'${value}'`;
};

export default (abstractSyntaxTree) => {
  const plainMaper = (key) => {
    const stringGenereate = (node) => {
      const plainStrings = [
        {
          check: (elem) => elem.type === 'stabled' && 'children' in elem,
          action: (elem) => elem.children.map(plainMaper([...key, elem.key])),
        },
        {
          check: (elem) => elem.type === 'added' && 'children' in elem,
          action: (elem) => `Property '${[...key, elem.key].join('.')}' was added with value: ${valueToString(elem.children)}`,
        },
        {
          check: (elem) => elem.type === 'added' && 'value' in elem,
          action: (elem) => `Property '${[...key, elem.key].join('.')}' was added with value: ${valueToString(elem.value)}`,
        },
        {
          check: (elem) => elem.type === 'removed',
          action: (elem) => `Property '${[...key, elem.key].join('.')}' was removed`,
        },
        {
          check: (elem) => elem.type === 'updated',
          action: (elem) => `Property '${[...key, elem.key].join('.')}' was updated. From ${valueToString(elem.valuePrevious)} to ${valueToString(elem.valueNext)}`,
        },
        {
          check: () => true,
          action: () => null,
        },
      ];
      return plainStrings.find((b) => b.check(node)).action(node);
    };
    return stringGenereate;
  };
  return _.compact(_.flattenDeep(abstractSyntaxTree.map(plainMaper([])))).join('\n');
};
