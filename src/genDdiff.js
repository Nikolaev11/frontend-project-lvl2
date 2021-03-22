import path from 'path';
import reader from './reader.js';
import pars from './parsers.js';
import generateAST from './ASTgenerator.js';
import formatter from './formatters/index.js'; // убрать две точки

export default (filepath1, filepath2, format) => {
  // reader сюда
  const extensionName = (filepath) => path.extname(filepath).slice(1);
  const content1 = reader(filepath1);
  const content2 = reader(filepath2);
  const data1 = pars(content1, extensionName(filepath1));
  const data2 = pars(content2, extensionName(filepath2));
  const abstractSyntaxTree = generateAST(data1, data2);
  const render = formatter(format);
  return render(abstractSyntaxTree);
};
