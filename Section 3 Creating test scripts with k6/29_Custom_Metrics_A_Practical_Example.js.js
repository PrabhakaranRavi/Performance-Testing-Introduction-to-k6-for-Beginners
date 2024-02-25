import http from "k6/http"
import { check } from "k6"
import { Counter, Trend } from "k6/metrics"
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<400'],
        my_counter: ['count<400'],
        news_Page_Response_Time: ['p(95)<400','p(99)<300']
    }
}
let my_counter = new Counter("my_counter");
let news_Page_Response_Time = new Trend("news_Page_Response_Time")

export default function () {
    let response = http.get("https://test.k6.io/");
    my_counter.add(1)
    check(response, {
        "Status code is 200": (response) => response.status === 200,
        "Body checking": (response) => response.body.includes("Collection of simple web-pages suitable for load testing")

    })
    response = http.get("https://test.k6.io/news.php");
    news_Page_Response_Time.add(response.timings.duration);


}