const IAM_TOKEN = 't1.9euelZqQz8_Ij8vHkImanYudzJHJkO3rnpWazpzPzZnLx46Ojp2NmY2Zzsjl8_c-BRV--e9HPios_N3z934zEn7570c-Kiz8.eMOqfnRixTwHIHRei-K9-mTQDZDCRftrcyOy00ew-oo9PJIDCg1fPbaiHTyIuaU8Jt0i88wsrti_nd94gciQDg'
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