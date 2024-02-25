import http from "k6/http"
import { check } from "k6"

export const options = {
    target: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<290'],
        http_req_failed: ['rate<0.01']
    }
}
export default function () {
    const response = http.get("https://test.k6.io");
    check(response, {
        "Status code is 200": (response) => response.status === 200,
        "Body checking": (response) => response.body.includes("Collection of simple web-pages suitable for load testing")

    })
}