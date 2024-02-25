import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';

const usercredentials = new SharedArray("User datas", function () {
    return JSON.parse(open("./users.json")).users;
})
// console.log(usercredentials);

export default function () {
    usercredentials.forEach((users) => {
        const credentials = {
            username: users.username,
            password: users.password,
        }

        http.post(
            'https://test-api.k6.io/user/register/',
            JSON.stringify(credentials),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    })
}

// export default function () {

//     const randomCredential = randomItem(userCredentials);

//     let res = http.post(
//         'https://test-api.k6.io/auth/token/login/',
//         JSON.stringify(
//             {
//                 username: randomCredential.username,
//                 password: randomCredential.password
//             }
//         ),
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//     );

//     check(res, {
//         'status is 200': (r) => r.status === 200,
//         'has access token': (r) => r.json() !== undefined
//     });
    
//     const accessToken = res.json().access;
// }

