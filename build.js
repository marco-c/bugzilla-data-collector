'use strict';

const fs = require('fs');
const archiver = require('archiver');

const includeFiles = [
  'manifest.json',
  'bugzilla.js', 'bdc.png',
  'options.html', 'options.js',
];
const zipName = './bugzilla-data-collector.zip';

function makeZip(list){
  const output = fs.createWriteStream(zipName);

  let archive = archiver('zip', {
    zlib: { level: 9 }
  });

  archive.on('error', e => { throw e; });

  archive.pipe(output);

  list.forEach(file => archive.file(file));

  archive.finalize();
}

fs.readdir('.', (e, files) => {
  if (e) {
    throw e;
  }

  const resultFiles = files.filter(file => includeFiles.includes(file));

  makeZip(resultFiles);
});
