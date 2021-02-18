import _ from 'lodash';
import program from 'commander';
import fs from 'fs';

export const readJsonSynchronic = (path) => {
  try {
    const content = fs.readFileSync(path);
    return JSON.parse(content);
  } catch (e) {
    console.log(e);
  }
}

export const genDiff = (inp1, inp2) => {
  const inputKeysArray = _.sortBy(_.uniq([...Object.keys(inp1), ...Object.keys(inp2)], 'A'));
  //console.log(inputKeysArray);
  const arr = inputKeysArray.reduce( (acc, key) => {
    if (key in inp1 && key in inp2) {
    if (inp1[key] === inp2[key] ) {
      acc.push(`  ${key}: ${inp1[key]}`)
      return acc;
    }
    else {
      acc.push(`- ${key}: ${inp1[key]}`);
      acc.push(`+ ${key}: ${inp2[key]}`);
      return acc;
    }
  }
  if (key in inp1) {
    acc.push(`- ${key}: ${inp1[key]}`)
    return acc;
  }
  if (key in inp2) {
    acc.push(`+ ${key}: ${inp2[key]}`)
    return acc;
  }
 }, [] );
 return `{\n  ${arr.join('\n  ')}\n}`;
}

program.version('0.1', '-V, --version', 'output the current version');
program.description('Compares two configuration files and shows a difference.', '-h, --help', );
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2) => {
  const inputJson1 = readJsonSynchronic(filepath1);
  const inputJson2 = readJsonSynchronic(filepath2);
  //console.log('filepath1:', inputJson1);
  //console.log('filepath2:', inputJson2);
  console.log(genDiff(inputJson1, inputJson2));
});

program.parse(process.argv);
const options = program.opts();
