import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    {
      target: 500,
      duration: '5m'
    },
    {
      target: 500,
      duration: '50m'
    },
    {
      target: 500,
      duration: '5m'
    },
  ]

}
export default function () {
  http.get("https://test.k6.io/");
  sleep(1);
  http.get("https://test.k6.io/news.php");
  sleep(2);
  http.get("https://test.k6.io/contacts.php");
  sleep(3);
}
