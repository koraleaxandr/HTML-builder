const fs = require('fs');
const path = require('path');
//const {stdin,stdout} = process;

const folder = path.join(__dirname, 'secret-folder')

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const pathsToCheck = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(pathsToCheck, (err, stats) => {
        if (err) throw err;
        console.log(path.parse(file.name).name + ' -' + path.extname(file.name).replace('.', ' ') + ' - ' + stats.size + 'bytes');
      });
}
  });
});

//onsole.log(files);