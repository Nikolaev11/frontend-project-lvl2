import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import yaml from 'js-yaml';

const parserData = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  switch (path.extname(filePath)) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
      return yaml.load(content);
    default:
      return content;
  }
};

export const parseSynchronicForTests = (inputPath) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const getFilePath = (filename) => path.join(__dirname, filename);
    return parserData(getFilePath(inputPath));
  } catch (e) {
    console.log(e);
  }
  return false;
};

export default (inputPath) => {
  try {
    const filePath = path.isAbsolute(inputPath) ? inputPath
      : path.resolve(process.cwd(), inputPath);
    return parserData(filePath);
  } catch (e) {
    console.log(e);
  }
  return false;
};
