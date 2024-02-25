import http from "k6/http";
import { Counter } from "k6/metrics";
import { check, sleep } from "k6";
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000'],
        'http_req_duration{page:order}': ['p(95)<1000'],
        https_errors: ['count===0'],
        'https_errors{page:order}': ['count===0'],
        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99']
    }
}

const https_errors = new Counter("https_errors");

export default function () {
    let res = http.get("https://run.mocky.io/v3/422da640-ef59-46c4-839c-b8a6e8b2ff7e");

    if (res.error) {
        https_errors.add(1)
    }
    check(res, {
        "Status code is 200": (res) => res.status === 200
    })

    sleep(1);

    res = http.get("https://run.mocky.io/v3/ab5e2c05-6a47-46ff-a4db-8baad56e1727?mocky-delay=1100ms", {
        tags: {
            page: 'order'
        }
    });

    if (res.error) {
        https_errors.add(1, { page: 'order' })
    }
    check(res, {
        "Status code is 200": (res) => res.status === 201
    }, { page: 'order' })

    sleep(1);

}