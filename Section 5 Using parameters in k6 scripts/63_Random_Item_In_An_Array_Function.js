import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export const options = {
    vus: 5,
    duration: '5s'
}
export default function () {
    let res = http.get("https://test-api.k6.io/public/crocodiles/");
    const crocodilesID = res.json().map(item => item.id);
    const crocodileSingleID = randomItem(crocodilesID);


    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileSingleID}`);
    check(res, {
        "Status": (res) => res.status === 200,
        "ID": (res) => res.json().id === crocodileSingleID
    })
}
