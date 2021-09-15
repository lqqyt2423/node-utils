#!/usr/bin/env node

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const childProcess = require('child_process');

const DATA_PATH = os.homedir();
const DB_NAME = '.nvmp-db.json';
const DB_PATH = path.resolve(DATA_PATH, DB_NAME);

function resetDb() {
  try {
    fs.unlinkSync(DB_PATH);
  } catch (err) {}
}

function getDb() {
  let content;
  try {
    content = fs.readFileSync(DB_PATH, 'utf8');
  } catch (err) {
    return null;
  }

  let db;
  try {
    db = JSON.parse(content);
  } catch (err) {
    resetDb();
    return null;
  }

  if (typeof db !== 'object') {
    resetDb();
    return null;
  }

  return db;
}

function saveDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

function find() {
  const db = getDb();
  if (!db) return;

  const cwd = process.cwd();
  const version = db[cwd];
  
  return version;
}

function add() {
  const db = getDb() || {};
  const cwd = process.cwd();
  db[cwd] = childProcess.execSync('node -v').toString().trim();
  saveDb(db);
}

const argv = process.argv.slice(2);
if (argv[0] === 'find') {
  const version = find();
  if (version) console.log(version);
  process.exit();
}
else if (argv[0] === 'add' || !argv[0]) {
  add();
  process.exit();
}
