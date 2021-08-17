import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (data, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return formatStylish(data);
  }
};
