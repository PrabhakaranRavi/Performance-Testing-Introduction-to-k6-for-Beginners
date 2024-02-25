import http from "k6/http"
import { check } from "k6";

export default function () {
    const response = http.get("https://test-api.k6.io/public/crocodiles/3/");
    console.log(response.json().name);
  
    check(response, {
        "Status code is 200": (response) => response.status === 200,
        "Checking Crocodile name is Lyle the Crocodile": (response) => response.json().name === "Lyle the Crocodile"
    })
}

