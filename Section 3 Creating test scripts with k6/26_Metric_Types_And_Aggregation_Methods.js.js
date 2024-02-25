import http from "k6/http"
import { check } from "k6"

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<290'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>300'],
        http_reqs: ['rate>30'],
        vus: ['value>9']
    }
}
export default function () {
    const response = http.get("https://test.k6.io");
    check(response, {
        "Status code is 200": (response) => response.status === 200,
        "Body checking": (response) => response.body.includes("Collection of simple web-pages suitable for load testing")

    })
}