import yaml from 'js-yaml';

export default (content, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(content);
      // return data;
    case '.yml':
      return yaml.load(content);
    default:
      return content;
  }
};
