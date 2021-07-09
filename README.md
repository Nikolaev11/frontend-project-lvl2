### Hexlet tests and linter status:
[![Actions Status](https://github.com/Nikolaev11/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Nikolaev11/frontend-project-lvl2/actions)
[![CodeLinter](https://github.com/Nikolaev11/frontend-project-lvl2/workflows/Super-Linter/badge.svg)](https://github.com/Nikolaev11/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/207062038454c56e139d/maintainability)](https://codeclimate.com/github/Nikolaev11/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/207062038454c56e139d/test_coverage)](https://codeclimate.com/github/Nikolaev11/frontend-project-lvl2/test_coverage)
### About:
Utility display [diff](https://en.wikipedia.org/wiki/Diff) between two data structure.
  Supported data input file formats:
* json
* yml/yaml

Output format:
* stylish
* plain
* json

### Install:
```
$ git clone https://github.com/Nikolaev11/frontend-project-lvl2
$ cd frontend-project-lvl2
$ make install
```
### Help:
```
$ gendiff --help
```
### Usage:
```
$ gendiff <file1> <file2> [options]
```
Options:
```
-f, --format [ stylish | palin | json ]  output format
-h, --help                               output usage information
-V, --version                            output the version
```
### Examples:
#### JSON-JSON diff simple data, default output (stylish)
```
 $ gendiff file1.json file2.json
```
[![asciicast](https://asciinema.org/a/tVMI0lzqgq0YJEvhyq7Ojn4ZS.svg)](https://asciinema.org/a/tVMI0lzqgq0YJEvhyq7Ojn4ZS)
#### YML-YML diff simple data, default output (stylish)
```
 $ gendiff file1.yml file2.yml
```
#### YML-JSON diff simple data, default output (stylish)
```
 $ gendiff file1.yml file2.json
```
[![asciicast](https://asciinema.org/a/NPeAnzMDUH8lh5w9ZmwdfeRlo.svg)](https://asciinema.org/a/NPeAnzMDUH8lh5w9ZmwdfeRlo)
#### JSON-YML diff tree data, default output (stylish)
```
 $ gendiff file1.json file2.json
```
[![asciicast](https://asciinema.org/a/oommBWzbVhLHNfscDA1YbU37U.svg)](https://asciinema.org/a/oommBWzbVhLHNfscDA1YbU37U)
#### JSON-YML diff tree data, stylish output
```
 $ gendiff file1.json file2.json -f stylish
```
#### JSON-YML diff tree data, plain output
```
 $ gendiff file1.json file2.json -f plain
```
[![asciicast](https://asciinema.org/a/3wAMP5LgmFNvKf96rLIDFI2lp.svg)](https://asciinema.org/a/3wAMP5LgmFNvKf96rLIDFI2lp)
#### JSON-YML diff tree data, JSON output
```
 $ gendiff file1.json file2.json -f json
```
[![asciicast](https://asciinema.org/a/gC0LaKcji9rDcTV5GkcLhosEA.svg)](https://asciinema.org/a/gC0LaKcji9rDcTV5GkcLhosEA)
