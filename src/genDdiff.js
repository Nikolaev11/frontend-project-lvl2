import path from 'path';
import fs from 'fs';
import pars from './parsers.js';
import generateAST from './ASTgenerator.js';
import formatter from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  const read = (filepath) => {
    const pathResolved = path.isAbsolute(filepath) ? filepath
      : path.resolve(process.cwd(), filepath);
    return fs.readFileSync(pathResolved, 'utf8');
  };

  const extensionName = (filepath) => path.extname(filepath).slice(1);
  const content1 = read(filepath1);
  const content2 = read(filepath2);
  const data1 = pars(content1, extensionName(filepath1));
  const data2 = pars(content2, extensionName(filepath2));
  const abstractSyntaxTree = generateAST(data1, data2);
  const render = formatter(format);
  return render(abstractSyntaxTree);
};
