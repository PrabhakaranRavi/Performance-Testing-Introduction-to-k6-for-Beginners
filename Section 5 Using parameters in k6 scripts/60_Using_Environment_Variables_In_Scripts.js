import http from 'k6/http';

export default function () {
    //k6 run --env BASE_URL=https://example.com script.js
    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}