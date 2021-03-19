import path from 'path';
import reader from './reader.js';
import parser from './parser.js';
import diff from './diff.js';
import selectFormatter from '../formatters/index.js';

export default (filepath1, filepath2, format) => {
  const fileData1 = reader(filepath1);
  const fileData2 = reader(filepath2);
  const data1 = parser(fileData1, path.extname(filepath1));
  const data2 = parser(fileData2, path.extname(filepath2));
  const formatter = selectFormatter(format);
  return formatter(diff(data1, data2));
};
