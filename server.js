const axios = require('axios');
const readline = require('readline');
var cheerio = require('cheerio')
const chalk = require('chalk')

const IAM_TOKEN = 't1.9euelZqezY-ZyonKzZaLj4-dk86Lle3rnpWazpzPzZnLx46Ojp2NmY2Zzsjl8_chECd--e9vJG1E_t3z92E-JH75728kbUT-.bKLTkPXgVCNDc3KY34uQsAUNwAi3IIUZxTVgZ0lT3DIEdMeT2PmKLSdRo1W-zzkXDRPnTlyY4Fc1-axISAp9Bg'
const FOLDER = 'b1gv52skb4fvrna3j95p'

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const question = (que) => {
    return new Promise((res, rej) => {
        rl.question(que, answer => {
            res(answer)
        })
    })
}
const TRANSLATOR = (translate) => axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
    "folder_id": FOLDER,
    "texts": translate,
    "targetLanguageCode": "ru" 
}, {
    headers: {
        'Content-Type': 'aaplication/json',
        'Authorization': 'Bearer ' + IAM_TOKEN
    }
})
.then((res) => {
    console.log(chalk.green.bold(res.data.translations[0].text))
}).catch((err) => {
    console.log(err);
})

const NEWS = () => axios.get('https://cybersport.ru//')
    .then(res => {
        var $ = cheerio.load(res.data);
        $('.news-sidebar__link').each(function (i, el){
            console.log(chalk.yellow($(this).html()))
        })
    })
    .catch(err => console.log('Error: ' + err))

const START = async () => {
    while(true) {
        try {
            const QUESTION = await question("Выберите действие: (Новости/Перевод/Выход) > ")
            if (QUESTION === 'Новости') {
                 await NEWS()
            } else if (QUESTION === 'Перевод') {
                const text = await question('Введите текст для перевода: > ') 
                await TRANSLATOR(text)
            } else if (QUESTION === 'Выход') {
                break
            }
        } catch (err) {
            console.log(err)
        }
    }
    rl.close()
}
rl.on('close', () => {
    console.clear()
    console.log(chalk.red.bold('Удачи!'))
})

START()


