import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import yaml from 'js-yaml';

const parseSynchronic = (inputPath) => {
  try {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = dirname(__filename);
    const getFixturePath = (filename) => path.join(__dirname, filename);
    const content = fs.readFileSync(getFixturePath(inputPath), 'utf8');
    let parsedData;
    switch (path.extname(inputPath)) {
      case '.json':
        parsedData = JSON.parse(content);
        break;
      case '.yml':
        parsedData = yaml.load(content);
        break;
      default:
        return content;
    }
    return parsedData;
  } catch (e) {
    console.log(e);
  }
  return false;
};

export default parseSynchronic;
