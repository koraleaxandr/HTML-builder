const fs = require('fs');
const path = require('path');
const Buffer = require('buffer');

const stylesDirPath = path.join(__dirname, 'styles');
//const stream = fs.createReadStream('template.html', 'utf-8');
// let data = '';
// stream.on('data', chunk => data += chunk);
// stream.on('end', () => console.log('End', data));

fs.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true}, (err) => { 
  splitCssFiles();
  fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true }, (err) => {
      copyDir(path.join(__dirname,'assets'), path.join(__dirname, 'project-dist', 'assets'));
  if (err) throw err;
});     
    if (err)
        //throw err;
       console.log(err);       
});

function copyDir(from, dest) { 
    fs.mkdir(dest,{ recursive: true }, (err) => {
  if (err) throw err;
});    
    fs.readdir(from, {withFileTypes: true}, (err, files) => {
                if (err) throw err;
                files.forEach(file => {
                    const srcPath = path.join(from, file.name);
                    const destPath = path.join(dest, file.name);
                            if (file.isFile()) {                                
                           fs.copyFile(srcPath, destPath, (err) => {
                                   if (err)
                                       //throw err;
                                       console.log(err);
                               })
                            } else {
                               // fs.mkdir(destPath)
                            copyDir(srcPath, destPath);
                            }
                        })
                    });
                };

function splitCssFiles() {     
    fs.readdir(stylesDirPath, {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        let data = '';
        files.forEach(file => {
            if (file.isFile() && path.extname(file.name) === '.css') {
                fs.open(path.join(__dirname, 'styles', file.name), (err, fd) => {
                    if (err) throw err;
                    fs.read(fd, (err, bytesRead, buffer) => {
                        if (err) throw err;
                        console.log(buffer);
                        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), buffer + '\n', (err) => {
                            if (err) throw err;
                            console.log('The "data to append" was appended to file!');
                        })
                    })

                })
            }

        });
    })
}





