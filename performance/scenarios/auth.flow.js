import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

const BASE_URL = 'https://shop-pulse-9.preview.emergentagent.com';

// Custom metrics
const loginDuration = new Trend('login_duration');
const loginFailRate = new Rate('login_fail_rate');
const loginCount = new Counter('login_count');

export const options = {
    executor: 'constant-vus',
    vus: 1,
    duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    login_fail_rate: ['rate<0.05'],
    login_duration: ['p(95)<1500'],
  },

}
export default function () {
  // --- Login ---
  const loginRes = http.post(
      `${BASE_URL}/api/auth/login`,
      JSON.stringify({
        email: 'shweya1@gmail.com',
        password: 'Creative88#',
      }),
      {headers: {'Content-Type': 'application/json'}, tags: {name: 'login'}}
  );

  const loginPassed = check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'login response has token': (r) => !!r.json('token'),
    'login response has user': (r) => !!r.json('user'),
    'login response has user email': (r) => r.json('user').email === 'shweya1@gmail.com',
    'login response time < 2s': (r) => r.timings.duration < 2000,
  });

  loginDuration.add(loginRes.timings.duration);
  loginFailRate.add(!loginPassed);
  loginCount.add(1);

  if (!loginPassed) {
    console.error(`Login failed: status=${loginRes.status} body=${loginRes.body}`);
    return;
  }

  const token = loginRes.json('token');

  sleep(1);

  // --- Verify token via /auth/me ---
  const meRes = http.get(`${BASE_URL}/api/auth/me`, {
    headers: {Authorization: `Bearer ${token}`},
    tags: {name: 'auth_me'},
  });

  check(meRes, {
    'me status is 200': (r) => r.status === 200,
    'me returns correct email': (r) => r.json('email') === 'shweya1@gmail.com',
    'me returns user name': (r) => !!r.json('name'),
    'me response time < 1s': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
//   // --- Negative test: invalid credentials ---
//   const badLoginRes = http.post(
//     `${BASE_URL}/api/auth/login`,
//     JSON.stringify({
//       email: 'shweya1@gmail.com',
//       password: 'WrongPassword123',
//     }),
//     { headers: { 'Content-Type': 'application/json' }, tags: { name: 'login_invalid' } }
//   );
//
//   check(badLoginRes, {
//     'invalid login is rejected': (r) => r.status === 401 || r.status === 403 || r.status === 422,
//     'invalid login has no token': (r) => !r.json('token'),
//   });
//
//   sleep(1);
// }
