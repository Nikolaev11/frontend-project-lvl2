export function ReplaceUpdatedToRemoved(key, value) {
  this.type = 'removed';
  this.key = key;
  this.value = value;
}
export function ReplaceUpdatedToAdded(key, value) {
  this.type = 'added';
  this.key = key;
  this.value = value;
}

function stringGenereate() {
  const textSignature = new Map([
    ['added', '+ '],
    ['stabled', '  '],
    ['removed', '- '],
  ]);
  return `${textSignature.get(this.type)}${this.key}: ${this.value}`;
}

const updatedValueReplacer = (accum, elem) => {
  if (Array.isArray(elem.value)) {
    const element = elem;
    element.value = elem.value.reduce(updatedValueReplacer, []);
    accum.push(element);
  } else {
    if (elem.type === 'updated') {
      accum.push(new ReplaceUpdatedToRemoved(elem.key, elem.value1));
      accum.push(new ReplaceUpdatedToAdded(elem.key, elem.value2));
    } else {
      accum.push(elem);
    }
    return accum;
  }
  return accum;
};

const levelStepIndent = '  ';
export default (inpArr) => {
  const levelIndent1 = (treeDeep) => levelStepIndent.repeat(treeDeep * 2);
  const levelIndent2 = (treeDeep) => levelStepIndent.repeat(treeDeep * 2 - 1);

  let treeDeep = 0;
  const stylishReducer = (acc, elem) => {
    let accum = acc;
    const element = elem;
    if (Array.isArray(element.value)) {
      treeDeep += 1;
      element.value = `{${element.value.reduce(stylishReducer, '')}\n${levelIndent1(treeDeep)}}`;
      accum = `${acc}\n${levelIndent2(treeDeep)}${stringGenereate.apply(element)}`;
      treeDeep -= 1;
    } else {
      treeDeep += 1;
      accum = `${acc}\n${levelIndent2(treeDeep)}${stringGenereate.apply(elem)}`;
      treeDeep -= 1;
    }
    return accum;
  };
  return `{${inpArr.reduce(updatedValueReplacer, []).reduce(stylishReducer, '')}\n}`;
};
