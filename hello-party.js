const chalk = require('chalk');
const beep = require('beepbeep')

let i = 0;
const loader = setInterval(() => {
    process.stdout.clearLine(); 
    process.stdout.cursorTo(0); 
    i = (i + 1) % 4;
    var dots = new Array(i + 1).join('.');
    process.stdout.write(chalk.bold.red('Загрузка') + chalk.bold.cyan(dots));
}, 500);

setTimeout(() => {
  clearInterval(loader);
  process.stdout.clearLine();
  process.stdout.write(chalk.italic.greenBright(`\rLoading is complete`))
  beep()
}, 5000);

