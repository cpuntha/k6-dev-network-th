import http from 'k6/http';
import { check, sleep } from 'k6';

export const option = {
  duration: '5m',
  vus: '5',
  thresholds: {
    http_req_duration: ['p(95)<500']
  }
}

export default function () {
  const response = http.get('https://news.sanook.com/lotto/check/31072566/#260453');
  check(response, {
    'is status 200': (r) => r.status === 200,
    'text verification': (r) => r.body.includes('ยินดีด้วยค่ะ...คุณถูกรางวัล')
  })
  sleep(Math.random() * 5);
}
