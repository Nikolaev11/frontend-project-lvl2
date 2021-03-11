import _ from 'lodash';
import selectFormatter from '../formatters/index.js';

function Stabled(key, value) {
  this.type = 'stabled';
  this.key = key;
  if (_.isObject(value)) {
    this.value = Object.entries(value).map(([a, b]) => new Stabled(a, b));
  } else {
    this.value = value;
  }
}
function Removed(key, value) {
  this.type = 'removed';
  this.key = key;
  if (_.isObject(value)) {
    this.value = Object.entries(value).map(([a, b]) => new Stabled(a, b));
  } else {
    this.value = value;
  }
}
function Added(key, value) {
  this.type = 'added';
  this.key = key;
  if (_.isObject(value)) {
    this.value = Object.entries(value).map(([a, b]) => new Stabled(a, b));
  } else {
    this.value = value;
  }
}
function Updated(key, value1, value2) {
  this.type = 'updated';
  this.key = key;
  if (_.isObject(value1)) {
    this.value1 = Object.entries(value1).map(([a, b]) => new Stabled(a, b));
  } else {
    this.value1 = value1;
  }
  if (_.isObject(value2)) {
    this.value2 = Object.entries(value2).map(([a, b]) => new Stabled(a, b));
  } else {
    this.value2 = value2;
  }
}

export const diff = (input1, input2) => {
  function Differed(key, value1, value2) {
    this.type = 'stabled';
    this.key = key;
    this.value = diff(value1, value2);
  }

  const diffReducer = (acc, key) => {
    if (key in input1 && key in input2) {
      if (_.isObject(input1[key]) && _.isObject(input2[key])) {
        acc.push(new Differed(key, input1[key], input2[key]));
      }
      if ((!_.isObject(input1[key]) && _.isObject(input2[key]))
      || (_.isObject(input1[key]) && !_.isObject(input2[key]))) {
        acc.push(new Updated(key, input1[key], input2[key]));
      }
      if (!_.isObject(input1[key]) && !_.isObject(input2[key])) {
        if (input1[key] === input2[key]) {
          acc.push(new Stabled(key, input1[key]));
        } else {
          acc.push(new Updated(key, input1[key], input2[key]));
        }
      }
      return acc;
    }
    if (key in input1) {
      acc.push(new Removed(key, input1[key]));
    }
    if (key in input2) {
      acc.push(new Added(key, input2[key]));
    }
    return acc;
  };

  const inputKeysArray = _.sortedUniq([...Object.keys(input1), ...Object.keys(input2)].sort());
  // console.log(inputKeysArray);
  return inputKeysArray.reduce(diffReducer, []);
};

export default (input1, input2, format) => {
  const formatter = selectFormatter(format);
  return formatter(diff(input1, input2));
};
