import { diff } from '../bin/diff.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import parseSynchronic from '../bin/parsers.js';

const inputJson1 = parseSynchronic('../__fixtures__/file1.json');
const inputJson2 = parseSynchronic('../__fixtures__/file2.json');
const inputYaml1 = parseSynchronic('../__fixtures__/file1.yml');
const inputYaml2 = parseSynchronic('../__fixtures__/file2.yml');
const expectedStylish = parseSynchronic('../__fixtures__/stylish_expected_file.txt');
const expectedPlain = parseSynchronic('../__fixtures__/plain_expected_file.txt');

test('diff stylish Json-Json', () => {
  expect(stylish(diff(inputJson1, inputJson2))).toEqual(expectedStylish);
});

test('diff stylish Yaml-Yaml', () => {
  expect(stylish(diff(inputYaml1, inputYaml2))).toEqual(expectedStylish);
});

test('diff stylish Json-Yaml', () => {
  expect(stylish(diff(inputJson1, inputYaml2))).toEqual(expectedStylish);
});

test('diff plain stylish Json-Json', () => {
  expect(plain(diff(inputJson1, inputJson2))).toEqual(expectedPlain);
});
