import _ from 'lodash';

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

const diff = (data1, data2) => {
  function Differed(key, value1, value2) {
    this.type = 'stabled';
    this.key = key;
    this.value = diff(value1, value2);
  }

  const diffReducer = (acc, key) => {
    if (key in data1 && key in data2) {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        acc.push(new Differed(key, data1[key], data2[key]));
      }
      if ((!_.isObject(data1[key]) && _.isObject(data2[key]))
      || (_.isObject(data1[key]) && !_.isObject(data2[key]))) {
        acc.push(new Updated(key, data1[key], data2[key]));
      }
      if (!_.isObject(data1[key]) && !_.isObject(data2[key])) {
        if (data1[key] === data2[key]) {
          acc.push(new Stabled(key, data1[key]));
        } else {
          acc.push(new Updated(key, data1[key], data2[key]));
        }
      }
      return acc;
    }
    if (key in data1) {
      acc.push(new Removed(key, data1[key]));
    }
    if (key in data2) {
      acc.push(new Added(key, data2[key]));
    }
    return acc;
  };

  const inputKeysArray = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return inputKeysArray.reduce(diffReducer, []);
};

export default diff;
