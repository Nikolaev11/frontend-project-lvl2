import _ from 'lodash';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

export const readJsonSynchronic = (inputPath) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const getFixturePath = (filename) => path.join(__dirname, filename);
    const content = fs.readFileSync(getFixturePath(inputPath), 'utf8');
    return content;
  } catch (e) {
    console.log(e);
  }
  return false;
};

export const genDiff = (inp1, inp2) => {
  const inputKeysArray = _.sortBy(_.uniq([...Object.keys(inp1), ...Object.keys(inp2)], 'A'));
  // console.log(inputKeysArray);
  const arr = inputKeysArray.reduce((acc, key) => {
    if (key in inp1 && key in inp2) {
      if (inp1[key] === inp2[key]) {
        acc.push(`  ${key}: ${inp1[key]}`);
      } else {
        acc.push(`- ${key}: ${inp1[key]}`);
        acc.push(`+ ${key}: ${inp2[key]}`);
      }
      return acc;
    }
    if (key in inp1) {
      acc.push(`- ${key}: ${inp1[key]}`);
    }
    if (key in inp2) {
      acc.push(`+ ${key}: ${inp2[key]}`);
    }
    return acc;
  }, []);
  return `{\n  ${arr.join('\n  ')}\n}\n`;
};
