import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDdiff from '../src/comparator.js';
import reader from '../src/reader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFilePath = (filename) => path.join(__dirname, filename);

const inputJson1 = getFilePath('../__fixtures__/file1.json');
const inputJson2 = getFilePath('../__fixtures__/file2.json');
const inputYaml1 = getFilePath('../__fixtures__/file1.yml');
const inputYaml2 = getFilePath('../__fixtures__/file2.yml');
const expectedStylish = reader(getFilePath('../__fixtures__/stylish_expected_file.txt'));
const expectedPlain = reader(getFilePath('../__fixtures__/plain_expected_file.txt'));
const expectedJson = reader(getFilePath('../__fixtures__/json_expected_file.txt'));

test('diff stylish Json-Json', () => {
  expect(genDdiff(inputJson1, inputJson2, 'stylish')).toEqual(expectedStylish);
});
test('diff stylish Json-Yaml', () => {
  expect(genDdiff(inputJson1, inputYaml2, 'stylish')).toEqual(expectedStylish);
});
test('diff stylish Yaml-Yaml', () => {
  expect(genDdiff(inputYaml1, inputYaml2, 'stylish')).toEqual(expectedStylish);
});
test('diff plain Json-Json', () => {
  expect(genDdiff(inputJson1, inputJson2, 'plain')).toEqual(expectedPlain);
});
test('diff json Json-Json', () => {
  expect(genDdiff(inputJson1, inputJson2, 'json')).toEqual(expectedJson);
});
