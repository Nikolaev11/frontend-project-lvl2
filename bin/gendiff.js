import program from 'commander';
import diff from './diff.js';
import parseSynchronic from './parsers.js';

program.version('0.1', '-V, --version', 'output the current version');
program.description('Compares two configuration files and shows a difference.', '-h, --help');
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2) => {
  const input1 = parseSynchronic(filepath1);
  const input2 = parseSynchronic(filepath2);
  // console.log('filepath1:', inputJson1);
  // console.log('filepath2:', inputJson2);
  console.log(diff(input1, input2));
});

program.parse(process.argv);
// const options = program.opts();
