import http from "k6/http"

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000'],

    }
}
export default function () {
    http.get("https://run.mocky.io/v3/422da640-ef59-46c4-839c-b8a6e8b2ff7e");
    http.get("https://run.mocky.io/v3/ab5e2c05-6a47-46ff-a4db-8baad56e1727?mocky-delay=1100ms");

}