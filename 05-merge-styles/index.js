const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'project-dist');
const stylesDirPath = path.join(__dirname, 'styles');


fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    //splitCssFiles();
    if (err) throw err;
    files.forEach(file => {
        if (path.extname(file.name) === '.css') {
            fs.rm(path.join(__dirname, 'project-dist', file.name), {recursive: true,force: true}, (err) => {                   
                
                if (err) 
                throw err;
                console.log(err);              
                });
        }
    }); 
    splitCssFiles(); 
});


function splitCssFiles() {   
      fs.readdir(stylesDirPath, {withFileTypes: true}, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                    if (file.isFile() && path.extname(file.name) === '.css') {
                        fs.open(path.join(__dirname, 'styles', file.name), (err, fd) => {
                                if (err) throw err;
                                fs.read(fd, (err, bytesRead, buffer) => {
                                        if (err) throw err;
                                       // console.log(buffer.toString());
                                        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), buffer.toString()+'}\n', (err) => {
                                                if (err) throw err;
                                                console.log('The "data to append" was appended to file!');
                                            })
                                        })

                                })
                        }

                    });
            })
    };

 // setTimeout(splitCssFiles, 1200);
   