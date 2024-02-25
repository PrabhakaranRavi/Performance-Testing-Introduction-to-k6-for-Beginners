import http from "k6/http"

export default function () {
    const response = http.get("https://test-api.k6.io/public/crocodiles/");
    console.log("Status: ", response);
    console.log("Status: ", JSON.parse(response.body));
}


//Command to run k6 run --http-debug="full" name of the file