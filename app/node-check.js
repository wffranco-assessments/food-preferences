/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const paths = [
  path.resolve(__dirname, 'package.json'),
  path.resolve(__dirname, 'node_modules', 'last.package.json'),
];

function exec(path, options = {}) {
  // {stdio: "ignore"} to ignore response
  try {
    const result = execSync(path, options);
    return result.toString();
  } catch (e) {
    return '';
  }
}

function readFile(name) {
  try {
    const file = fs.readFileSync(name, 'utf8');
    return file.toString();
  } catch (e) {
    return '';
  }
}

function updateNPM() {
  const original = readFile(paths[0]);
  if (!original) {
    console.error(`${paths[0]} not found.`);
    return;
  }

  const copy = readFile(paths[1]);
  if (!copy) {
    console.log('First time running prerun, or missing node_modules.');
  } else if (original === copy) {
    console.log('No changes in package.json');
    return;
  }

  console.log('Runing npm install...');
  if (exec('npm i')) {
    fs.writeFileSync(paths[1], original);
    console.log('Done.');
  }
}

try {
  updateNPM();
} catch (err) {
  console.log(err);
}
