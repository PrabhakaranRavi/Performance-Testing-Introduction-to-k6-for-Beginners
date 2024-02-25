import http from "k6/http"
import { check } from "k6";

export default function () {
    const mainResponse = http.get("https://test-api.k6.io/public/crocodiles/");

    const firstResponse = http.get(`https://test-api.k6.io/public/crocodiles/${mainResponse.json()[0].id}/`);

    console.log(firstResponse.json().name + mainResponse.json()[0].name);

    check(firstResponse, {
        "Status code is 200": (firstResponse) => firstResponse.status === 200,
        "Crocodile name": (firstResponse) => firstResponse.json().name === mainResponse.json()[0].name
    })
}