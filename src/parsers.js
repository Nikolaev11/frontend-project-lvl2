import yaml from 'js-yaml';

export default (content, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      return content; // выброс ошибки error
  }
};
