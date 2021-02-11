const { program } = require('commander');
program.version('0.1', '-V, --version', 'output the current version');
program.description('Compares two configuration files and shows a difference', '-h, --help', )

program.parse(process.argv);
const options = program.opts();
