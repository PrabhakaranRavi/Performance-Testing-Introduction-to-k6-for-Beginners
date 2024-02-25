import http from "k6/http"
import { check } from "k6"
export default function () {
    const response = http.get("https://test.k6.io");
    check(true, {
        "true is true": (value) => value === true
    })
}