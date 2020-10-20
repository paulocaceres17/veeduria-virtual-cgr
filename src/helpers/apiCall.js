import qs from 'qs'
import axios from 'axios'

const Headers = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    "Access-Control-Allow-Origin": "*"
}

export const apiCall = ( method, url, data, headers = Headers ) => axios({
    method,
    url,
    data: qs.stringify({
        ...data
    }),
    headers
})
