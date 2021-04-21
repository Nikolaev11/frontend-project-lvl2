import _ from 'lodash';

const defaultIndent = '  ';
const getDepthPrefix = (depth) => defaultIndent.repeat(depth * 2 - 1);
const typePrefix = {
  added: '+ ',
  unchanged: '  ',
  removed: '- ',
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;
  return `{\n${Object.entries(value).map(([key, val]) => `${getDepthPrefix(depth)}${defaultIndent}${key}: ${stringify(val,
    depth + 1)}`).join('\n')}\n${defaultIndent.repeat(2 * (depth - 1))}}`;
};

const stylishMapper = (elem, depth) => {
  switch (elem.type) {
    case 'nested':
      return `${getDepthPrefix(depth)}${typePrefix.unchanged}${elem.key}: {\n${elem.children
        .map((element) => stylishMapper(element, depth + 1)).join('\n')}\n${defaultIndent.repeat(2 * depth)}}`;
    case 'unchanged':
    case 'added':
    case 'removed':
      return `${getDepthPrefix(depth)}${typePrefix[elem.type]}${elem.key}: ${stringify(elem.value, depth + 1)}`;
    case 'updated':
      return `${getDepthPrefix(depth)}${typePrefix.removed}${elem.key}: ${stringify(elem.valuePrevious,
        depth + 1)}\n${getDepthPrefix(depth)}${typePrefix.added}${elem.key}: ${stringify(elem.valueNext, depth + 1)}`;
    default:
      return '';
  }
};

export default (ast) => `{\n${ast.map((elem) => stylishMapper(elem, 1)).join('\n')}\n}`;
