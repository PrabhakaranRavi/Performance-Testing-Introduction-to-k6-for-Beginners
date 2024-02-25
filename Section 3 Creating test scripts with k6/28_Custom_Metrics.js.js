import http from "k6/http"
import { check } from "k6"
import { Counter } from "k6/metrics"
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<290'],
        my_counter: ['count>400']
    }
}
let my_counter = new Counter("my_counter")
export default function () {
    const response = http.get("https://test.k6.io/");
    my_counter.add(1)
    check(response, {
        "Status code is 200": (response) => response.status === 200,
        "Body checking": (response) => response.body.includes("Collection of simple web-pages suitable for load testing")

    })
}