import http from "k6/http"

export default function () {
    const body = {
        "username": "test_234546",
        "password": "test"
    }
    const params = {
        "Content-Type": "application/json"
    }
    const response = http.post("https://test-api.k6.io/auth/token/login/", body,params);
    console.log(response.body)
    console.log(response.json().access)

}