import diff from '../bin/diff.js';
import parseSynchronic from '../bin/parsers.js';

const inputJson1 = parseSynchronic('../__fixtures__/file1.json');
const inputJson2 = parseSynchronic('../__fixtures__/file2.json');
const inputYaml1 = parseSynchronic('../__fixtures__/file1.yml');
const inputYaml2 = parseSynchronic('../__fixtures__/file2.yml');
const expectedString = parseSynchronic('../__fixtures__/expected_file.txt');

test('diff Json-Json', () => {
  expect(diff(inputJson1, inputJson2)).toEqual(expectedString);
});

test('diff Yaml-Yaml', () => {
  expect(diff(inputYaml1, inputYaml2)).toEqual(expectedString);
});

test('diff Json-Yaml', () => {
  expect(diff(inputJson1, inputYaml2)).toEqual(expectedString);
});
