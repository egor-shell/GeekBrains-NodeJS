const request = require('request');
var cheerio = require('cheerio');

function News() {
    request('https://cybersport.ru//', function(err, res, html) {
        if (!err && res.statusCode === 200) {
            var $ = cheerio.load(html);
            return (
                $('.news-sidebar__link').each(function (i, el){
                    console.log($(this).html())
                })
            )
        }
    })
}

News()