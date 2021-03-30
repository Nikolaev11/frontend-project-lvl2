import _ from 'lodash';

const levelStepIndent = '  ';
const levelIndent = (treeDeep) => levelStepIndent.repeat(treeDeep * 2 - 1);
const levelIndentCloseBrace = (treeDeep) => levelStepIndent.repeat(treeDeep * 2);
const prefix = {
  added: '+ ',
  unchanged: '  ',
  removed: '- ',
};

export default (abstractSyntaxTree) => {
  const stringify = (node, treeDeep) => {
    if (!_.isObject(node)) {
      return node;
    }
    return `{\n${Object.entries(node).map(([key, value]) => `${levelIndent(treeDeep)}${levelStepIndent}${key}: ${stringify(value, treeDeep + 1)}`).join('\n')}\n${levelIndentCloseBrace(treeDeep - 1)}}`;
  };

  const stylishMapper = (treeDeep) => {
    const stringGenereate = (elem) => {
      switch (elem.type) {
        case 'nested':
          return `${levelIndent(treeDeep)}${prefix.unchanged}${elem.key}: {\n${elem.children.map(stylishMapper(treeDeep + 1)).join('\n')}\n${levelIndentCloseBrace(treeDeep)}}`;
        case 'unchanged':
        case 'added':
        case 'removed':
          return `${levelIndent(treeDeep)}${prefix[elem.type]}${elem.key}: ${stringify(elem.value, treeDeep + 1)}`;
        case 'updated':
          return `${levelIndent(treeDeep)}${prefix.removed}${elem.key}: ${stringify(elem.valuePrevious, treeDeep + 1)}\n${levelIndent(treeDeep)}${prefix.added}${elem.key}: ${stringify(elem.valueNext, treeDeep + 1)}`;
        default:
          throw new Error('Unknown node type');
      }
    };
    return stringGenereate;
  };
  return `{\n${abstractSyntaxTree.map(stylishMapper(1)).join('\n')}\n}`;
};
