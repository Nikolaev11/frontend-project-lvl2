import fs from 'fs';
import path from 'path';

export default (filepath) => {
  try {
    const pathResolved = path.isAbsolute(filepath) ? filepath
      : path.resolve(process.cwd(), filepath);
    return fs.readFileSync(pathResolved, 'utf8');
  } catch (e) {
    console.log(e);
  }
  return false;
};
