import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import astBuild from './treeBuilder.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, outputFormat) => {
  const read = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
  const getExtension = (filepath) => path.extname(filepath).slice(1);

  const content1 = read(filepath1);
  const content2 = read(filepath2);
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);
  const data1 = parse(content1, extension1);
  const data2 = parse(content2, extension2);
  const ast = astBuild(data1, data2);
  return format(ast, outputFormat);
};
