import program from 'commander';
import { readJsonSynchronic, genDiff } from './utils.js';

program.version('0.1', '-V, --version', 'output the current version');
program.description('Compares two configuration files and shows a difference.', '-h, --help');
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2) => {
  const inputJson1 = readJsonSynchronic(filepath1);
  const inputJson2 = readJsonSynchronic(filepath2);
  // console.log('filepath1:', inputJson1);
  // console.log('filepath2:', inputJson2);
  console.log(genDiff(JSON.parse(inputJson1), JSON.parse(inputJson2)));
});

program.parse(process.argv);
// const options = program.opts();
