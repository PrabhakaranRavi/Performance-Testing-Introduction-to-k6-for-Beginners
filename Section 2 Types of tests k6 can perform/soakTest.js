import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    {
      target: 5000,
      duration: '5m'
    },
    {
      target: 5000,
      duration: '36h'
    },
    {
      target: 0,
      duration: '5m'
    },
  ]

}
export default function () {
  http.get("https://test.k6.io/");
  sleep(1);
}
