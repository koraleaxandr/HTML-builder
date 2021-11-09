const fs = require('fs');
const path = require('path');
const Buffer = require('buffer');
const components = path.join(__dirname, 'components');
const stylesDirPath = path.join(__dirname, 'styles');
//------------******************************************************************************


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
//********************************************************************************************** */
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
//*********************************************************************************************** */
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
/************************************************************************************************************ */
// const stream = fs.createReadStream(path.join(__dirname,'template.html'), 'utf-8');
// let dataHtml = '';
// let dataheader = '';
// stream.on('data', chunk => dataHtml += chunk);
// stream.on('end', () => {
//     //console.log('End', dataHtml);

// const streamheader = fs.createReadStream(path.join(components,'header.html'), 'utf-8');

// streamheader.on('data', chunk => dataheader += chunk);
// //console.log(dataheader);
// streamheader.on('end', () => {
//     //console.log(dataheader);
    
// fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), dataHtml.replace('{{header}}', '<header class="header">' + dataheader, (err) => {
//                             if (err) throw err;
//                             console.log('The "data to append" was appended to HTML file!');
//                         })
// })

// const streamarticles = fs.createReadStream(path.join(components,'articles.html'), 'utf-8');
// let dataarticles = '';
// streamarticles.on('data', chunk => dataheader += chunk);
// //streamarticles.on('end', () => console.log('End', dataarticles));

// const streamfooter = fs.createReadStream(path.join(components,'footer.html'), 'utf-8');
// let datafooter = '';
// streamfooter.on('data', chunk => dataheader += chunk);
// //streamfooter.on('end', () => console.log('End', datafooter));



//********************************************************************************************* */



