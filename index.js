const express = require('express')
const axios = require('axios');
const app = express()
const port = 8080

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const IAM_TOKEN = 't1.9euelZqRi52dnciPnJmUj4vKl5CYkO3rnpWazpzPzZnLx46Ojp2NmY2Zzsjl8_cZLBt--e9fflw6_d3z91laGH75719-XDr9.wEMG-cQVsVST3vASHy31yRR2FB40mov3KxUFvK0WZH8vRjrpWD3bSE3ZT8sXk1P7tRxC5-OpMIc25w0oe8HGCw'
const FOLDER = 'b1gv52skb4fvrna3j95p'

app.post('/', async (req, res) => {
  const result = []
  await axios.post("https://translate.api.cloud.yandex.net/translate/v2/translate", {
  "folder_id": FOLDER,
  "texts": [req.body['text']],
  "targetLanguageCode": "en"
  }, {
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${IAM_TOKEN}`,
      }
  })
  .then(res => {
      res.data.translations.forEach(item => result.push(item.text));
  })
  .catch(err => {
      console.log('Error: ' + err);
  })
  const test = result.join('')

  res.send(JSON.stringify(test))
})

app.listen(port, () => {
  console.log(`Приложение запущено по адресу http://localhost:${port}`)
})