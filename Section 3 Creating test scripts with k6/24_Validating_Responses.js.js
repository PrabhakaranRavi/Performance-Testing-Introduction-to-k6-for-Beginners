import http from "k6/http"
import { check } from "k6"

export default function () {
    const response = http.get("https://test.k6.io");
    check(response, {
        "Status code is 200": (response) => response.status === 200,
        "Body checking": (response) => response.body.includes("Collection of simple web-pages suitable for load testing")

    })
}

//We have given HTTP request for another URL, but that page does not have this body so this fails.
export default function () {
    const response = http.get("https://test.k6.io/news.php");
    check(response, {
        "Status code is 200": (response) => response.status === 200,
        "Body checking": (response) => response.body.includes("Collection of simple web-pages suitable for load testing")

    })
}