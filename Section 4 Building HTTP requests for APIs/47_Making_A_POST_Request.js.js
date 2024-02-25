import http from "k6/http"

export default function () {
    const body = {
        username: `test${Date.now()}`,
        password: "test"
    }
    const paramsDetails = {
        "Content-Type": "application/json"
    }
    const res = http.post("https://test-api.k6.io/user/register/", body, paramsDetails);
    console.log(res.body);
}