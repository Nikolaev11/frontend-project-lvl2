const levelStepIndent = '  ';
const levelIndent1 = (treeDeep) => levelStepIndent.repeat(treeDeep * 2 - 1);
const levelIndent2 = (treeDeep) => levelStepIndent.repeat(treeDeep * 2);
const textSignature = {
  added: '+ ',
  stabled: '  ',
  removed: '- ',
};

export default (abstractSyntaxTree) => {
  const stylishMaper = (treeDeep) => {
    const stringGenereate = (elem) => {
      if ('value' in elem) {
        return `${levelIndent1(treeDeep)}${textSignature[elem.type]}${elem.key}: ${elem.value}`;
      }
      if ('children' in elem) {
        return `${levelIndent1(treeDeep)}${textSignature[elem.type]}${elem.key}: {\n${elem.children.map(stylishMaper(treeDeep + 1)).join('\n')}\n${levelIndent2(treeDeep)}}`;
      }
      if (elem.type === 'updated') {
        const previousAST = { key: elem.key };
        previousAST[Array.isArray(elem.valuePrevious) ? 'children' : 'value'] = elem.valuePrevious;
        previousAST.type = 'removed';
        const nextAST = { key: elem.key };
        nextAST[Array.isArray(elem.valueNext) ? 'children' : 'value'] = elem.valueNext;
        nextAST.type = 'added';
        return `${stringGenereate(previousAST)}\n${stringGenereate(nextAST)}`;
      }
      return null;
    };
    return stringGenereate;
  };
  return `{\n${abstractSyntaxTree.map(stylishMaper(1)).join('\n')}\n}`;
};
