const levelStepIndent = '  ';
export default (inpArr) => {
  let treeDeep = 0;
  const f1 = (acc, elem) => {
    let accum = acc;
    if (Array.isArray(elem)) {
      treeDeep += 2;
      accum = `${acc} {\n${levelStepIndent.repeat(treeDeep)}${elem.reduce(f1)}\n${levelStepIndent.repeat(treeDeep - 1)}}`;
      treeDeep -= 2;
    } else {
      accum = `${acc}\n${levelStepIndent.repeat(treeDeep)}${elem}`;
    }
    return accum;
  };
  return `{\n${inpArr.reduce(f1).split('\n').map((a) => `${levelStepIndent}${a}`).join('\n')}\n}`;
};
