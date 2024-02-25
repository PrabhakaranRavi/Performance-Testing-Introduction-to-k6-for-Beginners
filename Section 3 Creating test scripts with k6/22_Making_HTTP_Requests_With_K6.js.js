import http from "k6/http"

export default function () {
    const response = http.get("https://test.k6.io");
    console.log("Status: ", response.status);
    console.log("Body: ", response.body);
}