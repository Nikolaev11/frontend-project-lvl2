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

const stylishMapper = (element, depth) => {
  switch (element.type) {
    case 'nested':
      return `${getDepthPrefix(depth)}${typePrefix.unchanged}${element.key}: {\n${element.children
        .map((deepElement) => stylishMapper(deepElement, depth + 1)).join('\n')}\n${defaultIndent.repeat(2 * depth)}}`;
    case 'unchanged':
    case 'added':
    case 'removed':
      return `${getDepthPrefix(depth)}${typePrefix[element.type]}${element.key}: ${stringify(element.value, depth + 1)}`;
    case 'updated':
      return `${getDepthPrefix(depth)}${typePrefix.removed}${element.key}: ${stringify(element.oldValue,
        depth + 1)}\n${getDepthPrefix(depth)}${typePrefix.added}${element.key}: ${stringify(element.newValue, depth + 1)}`;
    default:
      return '';
  }
};

export default (ast) => `{\n${ast.map((element) => stylishMapper(element, 1)).join('\n')}\n}`;
