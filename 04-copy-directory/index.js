const fs = require('fs');
const path = require('path');


const folder = path.join(__dirname, 'files');

fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, (err) => {
  copyDir();
    if (err)
       // throw err;
       console.log(err);
       
});



function copyDir() {

    fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
        if (err)
            //throw err;
            console.log(err);
    });

  fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', file.name),
        path.join(__dirname, 'files-copy', file.name), 
        (err) => {
          if (err) 
          //throw err;
          console.log(err);
        }
      )}
    )}
  );
}

    