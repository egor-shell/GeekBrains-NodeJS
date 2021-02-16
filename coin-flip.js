const chalk = require('chalk');
const readline = require('readline');
const fs = require('fs')

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Начать игру? (Да/Нет)> '
})

if (fs.existsSync('stats.json')) {
    console.clear()
    statist()
} else {
    console.clear()
    let i = 0;
    const loader = setInterval(() => {
    process.stdout.clearLine(); 
    process.stdout.cursorTo(0); 
    i = (i + 1) % 4;
    var dots = new Array(i + 1).join('.');
    process.stdout.write(chalk.red('Подключение статистики') + chalk.cyan(dots));
    }, 300);
    const statsFile = {
        win: 0,
        lose: 0,
        incorrect: 0
    }
    setTimeout(
        function loadingStats() {
            clearInterval(loader);
            process.stdout.clearLine();
            const data = JSON.stringify(statsFile, null, 2)
            fs.writeFileSync('stats.json', data);
            console.clear();
            statist();
            rl.prompt();
        }, 5000
    )
}

function statist() {
    new Promise ((res, rej) => {
        fs.readFile('stats.json', 'utf8', (err, data) => {
            if (err) throw err
            res(JSON.parse(data))
        })
    }).then((value) => {
        rl.prompt()
        rl.on('line', (userInput) => {
            if (yes.includes(userInput.toLowerCase())) {
                console.clear()
                let updateStats = new Promise((res, rej) => {
                    fs.readFile('stats.json', 'utf8', (err, data) => {
                        if (err) throw err
                        res(JSON.parse(data))
                    })
                }).then((value) => {
                    let winrate
                    if ((value.incorrect + value.lose + value.win) === 0) {
                        winrate = 'Вы не сыграли ни одной игры'
                    } else {
                        winrate = Math.round(value.win / (value.incorrect + value.lose + value.win) * 100)
                    }
                    console.log(
                        chalk.green(`Побед: ${chalk.bold(value.win)};`),
                        chalk.red(`\nПоражений: ${chalk.bold(value.lose)};`),
                        chalk.yellow(`\nНеправильных значений: ${chalk.bold(value.incorrect)};`),
                        chalk.yellow(`\nВсего партий: ${chalk.bold(value.incorrect + value.lose + value.win)};`),
                        chalk.yellow(`\nПроцент побед: ${chalk.bold(winrate)};`)
                    );
                    // Генератор монетки
                    function randomInteger (min, max) {
                        let rand = min + Math.random() * (max + 1 - min);
                        return Math.floor(rand);
                    };
                    
                    let answer = randomInteger(1, 2)
            
                    if (answer === 1) {
                        answer = ['орел', 'орёл', '1', 'jhtk', 'о', 'j']
                    } else {
                        answer = ['решка', '2', 'htirf', 'р', 'h']
                    }
    
                    // Полный словарь ответов
                    let options = ['орел', 'орёл', '1', 'jhtk', 'решка', '2', 'htirf', 'р', 'о', 'j', 'h']
            
                    // Вопрос
                    rl.question(chalk.bold.yellowBright('Орёл или Решка? (О/Р)> \r'), (gameAnswer) => {
            
                        switch (options.includes(gameAnswer.toLowerCase()) + answer.includes(gameAnswer.toLowerCase())) {
                            case 2:      
                                console.clear()
                                new Promise ((res, rej) => {
                                    fs.readFile('stats.json', 'utf8', (err, data) => {
                                        if (err) throw err
                                        res(data)
                                    })
                                }).then((value) => {
                                    let stats = JSON.parse(value)
                                    let win = stats.win + 1
                                    stats.win = win
                                    let newStats = JSON.stringify(stats, null, 2)
                                    fs.writeFile('stats.json', newStats, (err) => {
                                        if (err) throw err;
                                    })
                                    rl.setPrompt('')
                                    console.log(
                                        chalk.green(`Побед: ${chalk.bold(stats.win)};`),
                                        chalk.red(`\nПоражений: ${chalk.bold(stats.lose)};`),
                                        chalk.yellow(`\nНеправильных значений: ${chalk.bold(stats.incorrect)};`),
                                        chalk.yellow(`\nВсего партий: ${chalk.bold(stats.incorrect + stats.lose + stats.win)};`),
                                        chalk.yellow(`\nПроцент побед: ${chalk.bold(Math.round(stats.win / (stats.incorrect + stats.lose + stats.win) * 100))};`)
                                    );
                                    console.log(chalk.bold.greenBright('Поздравляем!'))
                                    rl.setPrompt(chalk.bold.yellowBright('Сыграть ешё раз?> '))
                                    rl.prompt()
                                })
                                break;
                            case 1:
                                console.clear()
                                new Promise ((res, rej) => {
                                    fs.readFile('stats.json', 'utf8', (err, data) => {
                                        if (err) throw err
                                        res(data)
                                    })
                                }).then((value) => {
                                    let stats = JSON.parse(value)
                                    let lose = stats.lose + 1
                                    stats.lose = lose
                                    let newStats = JSON.stringify(stats, null, 2)
                                    fs.writeFile('stats.json', newStats, (err) => {
                                        if (err) throw err;
                                    })
                                    rl.setPrompt('')
                                    console.log(
                                        chalk.green(`Побед: ${chalk.bold(stats.win)};`),
                                        chalk.red(`\nПоражений: ${chalk.bold(stats.lose)};`),
                                        chalk.yellow(`\nНеправильных значений: ${chalk.bold(stats.incorrect)};`),
                                        chalk.yellow(`\nВсего партий: ${chalk.bold(stats.incorrect + stats.lose + stats.win)};`),
                                        chalk.yellow(`\nПроцент побед: ${chalk.bold(Math.round(stats.win / (stats.incorrect + stats.lose + stats.win) * 100))};`)
                                    );
                                    console.log(chalk.bold.redBright('Поражение'))
                                    rl.setPrompt(chalk.bold.yellowBright('Сыграть ешё раз?> '))
                                    rl.prompt()
                                })
                                break;    
                            case 0:
                                console.clear()
                                new Promise ((res, rej) => {
                                    fs.readFile('stats.json', 'utf8', (err, data) => {
                                        if (err) throw err
                                        res(data)
                                    })
                                }).then((value) => {
                                    let stats = JSON.parse(value)
                                    let incorrect = stats.incorrect + 1
                                    stats.incorrect = incorrect
                                    let newStats = JSON.stringify(stats, null, 2)
                                    fs.writeFile('stats.json', newStats, (err) => {
                                        if (err) throw err;
                                    })
                                    rl.setPrompt('')
                                    console.log(
                                        chalk.green(`Побед: ${chalk.bold(stats.win)};`),
                                        chalk.red(`\nПоражений: ${chalk.bold(stats.lose)};`),
                                        chalk.yellow(`\nНеправильных значений: ${chalk.bold(stats.incorrect)};`),
                                        chalk.yellow(`\nВсего партий: ${chalk.bold(stats.incorrect + stats.lose + stats.win)};`),
                                        chalk.yellow(`\nПроцент побед: ${chalk.bold(Math.round(stats.win / (stats.incorrect + stats.lose + stats.win) * 100))};`)
                                    );
                                    console.log(chalk.yellow('В следующий раз пишите без ошибок'))
                                    rl.setPrompt(chalk.bold.yellowBright('Сыграть ешё раз?> '))
                                    rl.prompt()
                                })
                                break;
                        }
                    })
                })
            } else if (no.includes(userInput.toLowerCase())) {
                rl.close()
            } else if (stats.includes(userInput.toLowerCase())) {
                statist()
            } else {
                rl.prompt()
            }
        }).on('close', () => {
            console.clear()
          console.log(chalk.italic.redBright('Удачи!'))
        })
    })
}

const yes = ['да', 'yes', 'lf', 'da']
const no = ['нет', 'не', 'net', 'ytn', 'yt']
const stats = ['stats', 's', 'с', 'c', 'стат', 'статистика']