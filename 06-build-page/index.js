const fs = require('fs');
const path = require('path');
const fsp = require('fs/promises');
const components = path.join(__dirname, 'components');
const stylesDirPath = path.join(__dirname, 'styles');
//------------******************************************************************************


fs.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true}, (err) => { 
  splitCssFiles();
  fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true }, (err) => {
      copyDir(path.join(__dirname,'assets'), path.join(__dirname, 'project-dist', 'assets'));
      getHTML();
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
                
const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
             readStream.on('data', partData => data += partData);
             readStream.on('end', ()=> fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css')).write(data));                   
                            console.log('The "data to append" was appended to file!');
                     
            }
        });
    })
}
/************************************************************************************************************ */
const getFilenamesInDir = (directory) => {
    return new Promise((res, err) => {
        let fileNames = [];
        fs.readdir(directory, (err, files) => { 
            for (const file of files) {
                if(path.extname(file)==='.html')
                    fileNames.push(path.parse(file).name);               
            }
            res(fileNames);
        })
    }) 
  }

async function getHTML() {
    // await fsp.mkdir(path.join(__dirname, 'project-dist'), {recursive:true});
     let template = await getFile(path.join(__dirname, 'template.html'));
     const files = await getFilenamesInDir(path.join(__dirname, 'components'));
     const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
     for (const file of files) {        
        template = template.replace(`{{${file}}}`, await getFile(path.join(__dirname, 'components', `${file}.html`)));        
     }
    // console.log(template);
     writeStream.write(template);          
 };

 const getFile = (pathToFile) => {
    return new Promise((res, err) => {
        let data = '';
        const readStream = fs.createReadStream(pathToFile);
        readStream.on('data', chunk => {data += chunk; res(data)});
    });
 }



//********************************************************************************************* */

