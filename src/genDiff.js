import path from 'path';
import fs from 'fs';
import pars from './parsers.js';
import generateAst from './astGenerator.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, outputFormat) => {
  const read = (filepath) => {
    const pathResolved = path.isAbsolute(filepath) ? filepath
      : path.resolve(process.cwd(), filepath);
    return fs.readFileSync(pathResolved, 'utf8');
  };

  const getExtension = (filepath) => path.extname(filepath).slice(1);

  const content1 = read(filepath1);
  const content2 = read(filepath2);
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);
  const data1 = pars(content1, extension1);
  const data2 = pars(content2, extension2);
  const ast = generateAst(data1, data2);
  return format(ast, outputFormat);
};
