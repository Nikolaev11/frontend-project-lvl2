#!/usr/bin/env node
import program from 'commander';
import genDdiff from '../src/genDiff.js';

export default genDdiff;

program.version('0.1', '-V, --version', 'output the current version');
program.description('Compares two configuration files and shows a difference.', '-h, --help');
program.option('-f, --format [type]', 'output format', 'stylish');
program.arguments('<filepath1> <filepath2>');
program.action((filepath1, filepath2) => {
  console.log(genDdiff(filepath1, filepath2, program.opts().format));
});

program.parse(); // автотесты падают здесь // входной файл не тот?
