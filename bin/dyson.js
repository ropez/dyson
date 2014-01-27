#!/usr/bin/env node

require('coffee-script')

var cli = require('../lib/cli');

cli.execute(process.argv.slice(2));
