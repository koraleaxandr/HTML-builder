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
//   copyDir(path.join(__dirname,'assets'));
    if (err)
       // throw err;
       console.log(err);
       fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
        if (err)
            //throw err;
            console.log(err);
    });
});

function copyDir(from,dest) { 
    fs.mkdir(dest,{ recursive: true }, (err) => {
  if (err) throw err;
});    
    fs.readdir(from, {withFileTypes: true}, (err, files) => {
                if (err) throw err;
                files.forEach(file => {
                    const srcPath = path.join(from,entry.name);
                    const destPath = path.join(dest,entry.name);
                            if (file.isFile()) {                                
                           fs.copyFile(path.join(__dirname, file.name),
                               path.join(dirPath, file.name),
                               (err) => {
                                   if (err)
                                       //throw err;
                                       console.log(err);
                               })
                            } else copyDir(srcPath, destPath);
                        })
                    });
                };


// async function copyDir(src,dest) {
//     const entries = await FSP.readdir(src,{withFileTypes:true});
//     await FSP.mkdir(dest);
//     for(let entry of entries) {
//         const srcPath = Path.join(src,entry.name);
//         const destPath = Path.join(dest,entry.name);
//         if(entry.isDirectory()) {
//             await copyDir(srcPath,destPath);
//         } else {
//             await FSP.copyFile(srcPath,destPath);
//         }
//     }
// }

function copyFolder() { 
     fs.readdir(path.join(__dirname,'assets'), {withFileTypes: true}, (err, files) => {
        copyDir();
        if (err) throw err; 
    });
}


function splitCssFiles() {     
    fs.readdir(stylesDirPath, {withFileTypes: true}, (err, files) => {
        if (err) throw err;
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


// const folder = path.join(__dirname, 'files');

// fs.rm(path.join(__dirname, 'files-copy'), {
//         recursive: true,
//         force: true
//     },

//     (err) => {
//         copyDir();
//         if (err)
//             // throw err;
//             console.log(err);
//     });



// function copyDir() {

//     fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
//         if (err)
//             //throw err;
//             console.log(err);
//     });
//     fs.readdir(folder, {
//         withFileTypes: true
//     }, (err, files) => {
//         if (err) throw err;
//         files.forEach(file => {
//             fs.copyFile(path.join(__dirname, 'files', file.name),
//                 path.join(__dirname, 'files-copy', file.name),
//                 (err) => {
//                     if (err)
//                         //throw err;
//                         console.log(err);
//                 }
//             );
//         });
//     });
// }