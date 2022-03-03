#!/usr/bin/env node

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const defaultNodeVersion = 'v16.14.0';
const dbPath = path.resolve(os.homedir(), '.nvmp-db.json');
const commands = ['help', 'add', 'find', 'list', 'clean'];

let command = process.argv[2] || 'help';
if (command === '-h' || command === '--help') command = 'help';
if (command === 'ls') command = 'list';
if (!commands.includes(command)) command = 'help';

if (command === 'help') {
  console.log(`Nvmd is a tool for managing project default node version. You should install nvm first.

Usage: nvmd <command>

The commands are:

    help     show this help
    add      add current directory and current node version to local database
    list     list all added directories and versions
    find     find current directory node version
    clean    clean the local database
`);

  process.exit();
}

if (command === 'list') {
  console.log(getDb());
  process.exit();
}

if (command === 'find') {
  const db = getDb();
  if (!db) process.exit();

  const version = db[process.cwd()] || defaultNodeVersion;
  console.log(version);
  process.exit();
}

if (command === 'add') {
  const db = getDb() || {};
  const cwd = process.cwd();
  const version = process.version;
  db[cwd] = version;
  saveDb(db);
  console.log(`Add ${cwd} with ${version} version`);
  process.exit();
}

if (command === 'clean') {
  rmDb();
  console.log('Cleaned');
  process.exit();
}

function getDb() {
  let content;
  try {
    content = fs.readFileSync(dbPath, 'utf8');
  } catch (err) {
    return null;
  }

  let db;
  try {
    db = JSON.parse(content);
  } catch (err) {
    return null;
  }

  if (typeof db !== 'object') {
    return null;
  }

  return db;
}

function saveDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
}

function rmDb() {
  try {
    fs.unlinkSync(dbPath);
  } catch (err) {}
}
