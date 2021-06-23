import stylish from './stylish.js';
import plain from './plain.js';

export default (data, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return stylish(data);
  }
};
