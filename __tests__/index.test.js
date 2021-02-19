import { genDiff, readJsonSynchronic } from '../bin/utils.js';

const input1 = JSON.parse(readJsonSynchronic('../__fixtures__/file1.json'));
const input2 = JSON.parse(readJsonSynchronic('../__fixtures__/file2.json'));
const expectedString = readJsonSynchronic('../__fixtures__/expected_file.txt');

test('diff', () => {
  expect(genDiff(input1, input2)).toEqual(expectedString);
});
