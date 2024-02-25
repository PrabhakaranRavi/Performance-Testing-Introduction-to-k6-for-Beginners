import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300']
    }
}
export default function () {
    group("Main page", function () {
        let res = http.get("https://test.k6.io/");

        check(res, {
            "Status code is 200": (res) => res.status === 200
        }
        )

        group("Assests", function () {
            http.get("https://test.k6.io/static/css/site.css");
            http.get("https://test.k6.io/static/js/prisms.js");
        })

        sleep(1)
    })

    group("News page", function () {
        let res = http.get("https://test.k6.io/news.php");

        check(res, {
            "Status code is 200": (res) => res.status === 200
        }
        )

        sleep(1)
    })


}