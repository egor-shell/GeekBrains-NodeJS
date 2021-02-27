const IAM_TOKEN = 't1.9euelZqQz8_Ij8vHkImanYudzJHJkO3rnpWazpzPzZnLx46Ojp2NmY2Zzsjl8_dlMhZ--e93VkEP_d3z9yVhE37573dWQQ_9.LrHYxmZVGTZ5mUCH1USoPecqnFbCu282tHVIm9E3uK8Skd5p7dj8SuKS24v3bE3XgK8O1GehFjRaHBvfY_F2Dg'
const FOLDER = 'b1gv52skb4fvrna3j95p'

const axios = require('axios');

module.exports = function yandexTranslate(req) {
    return axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
            "folder_id": FOLDER,
            ...req
        }, {
            headers: {
                'Content-Type': 'aaplication/json',
                'Authorization': 'Bearer ' + IAM_TOKEN
            }
        })
}