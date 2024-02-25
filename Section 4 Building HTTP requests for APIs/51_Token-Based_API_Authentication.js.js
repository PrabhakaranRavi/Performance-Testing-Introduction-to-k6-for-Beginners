import http from 'k6/http';

export default function () {

    const credentials = {
        username: "test_23423",
        password: "secret"
    }

    let params = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        params
    );

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',

        JSON.stringify({
            username: credentials.username,
            password: credentials.password
        })
        ,
        params
    );

    const accessToken = res.json().access;
    console.log(accessToken);

    // params.headers["Authorization"] = `Bearer ${accessToken}`;

    const privateEndpoint = http.get("https://test-api.k6.io/my/crocodiles/",
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    console.log("privateEndpoint", privateEndpoint.body)
}