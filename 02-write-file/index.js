const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

// fs.writeFile(path.join(__dirname, 'mynotes.txt'), "", (err) => {
//         if (err) throw err;
//         console.log('Файл  уже был создан');
//     }
// );
const output = fs.createWriteStream(path.join(__dirname, 'mynotes.txt'));



stdout.write('Write your text or type exit\n');
stdin.on('data', data => { 
 // stdout.write(text);
  if (data.toString().slice(0, -2) !== 'exit') {
    output.write(data.toString());
    //process.exit();
  } else {
    process.exit();
  }
});

process.on('SIGINT', () => stdout.write('Удачи в изучении Node.js!'));
process.on('SIGINT', () => process.exit());

process.on('exit', code => {
  if (code === 0) {
    stdout.write('Удачи в изучении Node.js!');
  } else {
    stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
  }
});