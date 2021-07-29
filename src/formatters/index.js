import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (data, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return makeStylish(data);
    case 'plain':
      return makePlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return makeStylish(data);
  }
};
