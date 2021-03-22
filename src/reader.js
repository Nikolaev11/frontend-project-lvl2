import fs from 'fs';
import path from 'path';

export default (filepath) => {
  try {
    const pathResolved = path.isAbsolute(filepath) ? filepath // упросить одна спец функция
      : path.resolve(process.cwd(), filepath);
    return fs.readFileSync(pathResolved, 'utf8'); // ошибка отдать ошибку
  } catch (e) {
    console.log(e);
  }
  return false; // убрать
};
