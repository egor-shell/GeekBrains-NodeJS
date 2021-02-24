const axios = require('axios');

const IAM_TOKEN = 't1.9euelZqekYyVzImZyYqLmZ2Mi53Gyu3rnpWazpzPzZnLx46Ojp2NmY2Zzsjl8_cIayx--e8PaCEG_t3z90gZKn757w9oIQb-.v8sQB8rHbfzDKitphF77ON4rhRXL4Fn_FCurXhzE41Esk0e4SZt8Y2ic21av4DHTBtnJxIwUsEIiwo5V-uY4Aw'
const FOLDER = 'b1gevbojsrl7uf6s8aue'

axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
            "folder_id": FOLDER,
            "texts": ["Hello", "World"],
            "targetLanguageCode": "ru" 
        }, {
            headers: {
                'Content-Type': 'aaplication/json',
                'Authorization': 'Bearer ' + IAM_TOKEN
            }
        })
        .then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })